from ultralytics import YOLO

# 1. Load a pre-trained YOLOv8 model
# 'yolov8n.pt' is the smallest and fastest model, great for starting.
model = YOLO('yolov8n.pt')

# 2. Train the model using your dataset
# Make sure the 'data' path points to your 'data.yaml' file.
results = model.train(data="D:\Chinmay\Projects\PARAS-DEVJAMS\data.yaml", epochs=50, imgsz=640)

print("Training complete! Model saved.")