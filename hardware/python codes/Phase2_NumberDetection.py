import cv2
from ultralytics import YOLO
import pytesseract
import re
import numpy as np
from supabase import create_client, Client

SUPABASE_URL = "https://xmgfelmdksopdjhnudtl.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZ2ZlbG1ka3NvcGRqaG51ZHRsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODQ1Mjc1MywiZXhwIjoyMDc0MDI4NzUzfQ.Yg6iYbGSJrLzXp22GlVqQz15Mg9FWyymizTyEHGkDYU"  
MODEL_PATH = r"D:\Chinmay\Projects\PARAS-DEVJAMS\Python Codes\runs\detect\train\weights\best.pt"
pytesseract.pytesseract.tesseract_cmd = r"C:\Users\Chinmay\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"

def preprocess_for_ocr(roi):
    if roi is None or roi.size == 0:
        return None
    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    scale_factor = 2.5
    width = int(gray.shape[1] * scale_factor)
    height = int(gray.shape[0] * scale_factor)
    resized = cv2.resize(gray, (width, height), interpolation=cv2.INTER_CUBIC)
    sharpen_kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
    sharpened = cv2.filter2D(resized, -1, sharpen_kernel)
    _, thresholded = cv2.threshold(sharpened, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    return thresholded

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("✅ Successfully connected to Supabase.")
except Exception as e:
    print(f"❌ Error connecting to Supabase: {e}")
    exit()

model = YOLO(MODEL_PATH)
cap = cv2.VideoCapture(1)
if not cap.isOpened():
    print("❌ Error: Could not open webcam.")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        print("❌ Error: Could not read frame from webcam.")
        break

    results = model(frame, conf=0.5)
    found_plate = False

    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = [int(coord) for coord in box.xyxy[0]]
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)  # Debug red rectangle

            try:
                plate_roi = frame[y1:y2, x1:x2]
                processed_plate = preprocess_for_ocr(plate_roi)

                if processed_plate is not None:
                    text = pytesseract.image_to_string(processed_plate, config='--oem 3 --psm 7').strip()
                    print(f"DEBUG OCR output: '{text}'")
                    plate_text = "".join(filter(str.isalnum, text)).upper()
                    print(f"Cleaned Plate: '{plate_text}'")
                    plate_pattern = re.compile(r'^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{1,4}$')
                    if plate_pattern.match(plate_text):
                        print(f"✅ Valid plate '{plate_text}' found. Logging to database...")
                        data = {'license_plate': plate_text, 'status': 'Entered'}
                        try:
                            supabase.table('parking_records').insert(data).execute()
                            print("...Database entry successful.")
                        except Exception as e:
                            print(f"❌ Supabase insert error: {e}")

                        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                        cv2.putText(frame, plate_text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
                        cv2.imshow('Plate Detected!', frame)
                        cv2.waitKey(2000)
                        found_plate = True
                        break
                    else:
                        print("❌ Invalid plate format.")
                else:
                    print("❌ Processing failed or ROI empty.")

            except Exception as e:
                print(f"❌ OCR or processing exception: {e}")

        if found_plate:
            break

    cv2.imshow('Smart Parking System', frame)
    if cv2.waitKey(1) & 0xFF == ord('q') or found_plate:
        break

cap.release()
cv2.destroyAllWindows()
