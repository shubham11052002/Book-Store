import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>BookNest</h3>
          <p>
            Your trusted online bookstore with a wide collection of genres. 
            Discover your next great read with us.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/best-sellers">Best Sellers</Link></li>
            <li><Link to="/new-arrivals">New Arrivals</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/shipping">Shipping</Link></li>
            <li><Link to="/returns">Returns</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png" 
                alt="LinkedIn" 
                className="icon"
              />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
                alt="GitHub" 
                className="icon"
              />
            </a>
            <Link to="/contact" className="contact-btn">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/646/646094.png" 
                alt="Contact" 
                className="icon"
              /> Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 BookNest. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
