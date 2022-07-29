import { motion } from "framer-motion";
import { faEnvelope, faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./css/footerStyle.css";

export default function Footer() {
  const footerLinksHover = { x: 15 };
  return (
    <footer className="footer --verticle-flex --centered-flex --has-padding">
      <h3>All links/buttons in this footer are non-functional.</h3>
      <div className="newsletter-sub-container --verticle-flex">
        <h3 className="sub-heading --h3">Subscribe to our newsletter.</h3>
        <div className="input-container">
          <label className="prefix-icon-label" htmlFor="newsletter-email">
            <FontAwesomeIcon icon={faEnvelope} />
          </label>
          <input
            className="input"
            type="email"
            id="newsletter-email"
            placeholder="Enter your email"
          />
        </div>
        <button className="btn subscribe-btn --primary-btn --has-hover-overlay">
          Subscribe
        </button>
      </div>
      <div className="footer-quick-links-container">
        <div>
          <h3 className="sub-heading --h3">Legal Information</h3>
          <ul>
            {[
              "Terms & Conditions",
              "Return Policy",
              "Privacy Policy",
              "Cancellation Policy",
            ].map((text) => (
              <motion.li whileHover={footerLinksHover} key={`footer-${text}`}>
                {text}
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="sub-heading --h3">Help Desk</h3>
          <ul>
            {["FAQs", "Troubleshooting", "Get Help"].map((text) => (
              <motion.li whileHover={footerLinksHover} key={`footer-${text}`}>
                {text}
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="sub-heading --h3">Company</h3>
          <ul>
            {["Our History", "Blog", "Contact Us"].map((text) => (
              <motion.li whileHover={footerLinksHover} key={`footer-${text}`}>
                {text}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      <div className="copyright">
        <FontAwesomeIcon icon={faCopyright} />{" "}
        <span>2022 Brewed Store. All rights reserved.</span>
      </div>
    </footer>
  );
}
