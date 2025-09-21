import React from 'react';
import './Help.css';

const Help = () => {
  return (
    <div className="help">
      <div className="help-header">
        <h1>Help & Support</h1>
        <p>Get assistance with PARAS parking system</p>
      </div>

      <div className="help-content">
        <div className="help-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>How do I book a parking spot?</h3>
              <p>Select an available spot from the map, fill in your vehicle details, choose duration, and confirm your booking.</p>
            </div>
            <div className="faq-item">
              <h3>Can I extend my booking?</h3>
              <p>Yes, you can extend your booking from the "My Bookings" page if the spot is still available.</p>
            </div>
            <div className="faq-item">
              <h3>What payment methods are accepted?</h3>
              <p>We accept all major credit cards, debit cards, and digital wallets.</p>
            </div>
            <div className="faq-item">
              <h3>How do I cancel a booking?</h3>
              <p>Go to "My Bookings" and click the "Cancel Booking" button. Refunds are processed within 24 hours.</p>
            </div>
          </div>
        </div>

        <div className="help-section">
          <h2>Contact Support</h2>
          <div className="contact-info">
            <div className="contact-item">
              <h3>📞 Phone Support</h3>
              <p>+1 (555) 123-4567</p>
              <p>Available 24/7</p>
            </div>
            <div className="contact-item">
              <h3>📧 Email Support</h3>
              <p>support@paras.com</p>
              <p>Response within 2 hours</p>
            </div>
            <div className="contact-item">
              <h3>💬 Live Chat</h3>
              <p>Available on website</p>
              <p>Mon-Fri 9AM-6PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
