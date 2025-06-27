import type React from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import "./Footer.scss"

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h3 className="footer__title">PetCare Market</h3>
          <p className="footer__description">
            Making pet care products shopping meaningful by supporting animal shelters with every purchase.
          </p>
          <div className="footer__social">
            <a href="#" className="footer__social-link">📘</a>
            <a href="#" className="footer__social-link">🐦</a>
            <a href="#" className="footer__social-link">📷</a>
            <a href="#" className="footer__social-link">📌</a>
            <a href="#" className="footer__social-link">📺</a>
          </div>
        </div>

        <div className="footer__section">
          <h4 className="footer__subtitle">Shop</h4>
          <ul className="footer__links">
            <li><Link to="/shop/dog">Dog Products</Link></li>
            <li><Link to="/shop/cat">Cat Products</Link></li>
            <li><Link to="/shop/fish">Fish Products</Link></li>
            <li><Link to="/shop/bird">Bird Products</Link></li>
            <li><Link to="/shop/small-pets">Small Pets</Link></li>
            <li><Link to="/shop/reptile">Reptile Products</Link></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__subtitle">About Us</h4>
          <ul className="footer__links">
            <li><Link to="/help-shelters">Our Mission</Link></li>
            <li><Link to="/help-shelters">Partner Shelters</Link></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__subtitle">Customer Service</h4>
          <ul className="footer__links">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/shipping">Shipping Policy</Link></li>
            <li><Link to="/returns">Returns & Refunds</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">© 2025 PetCare Market. All rights reserved.</p>
        <div className="footer__payment">
          <span>💳</span>
          <span>💳</span>
          <span>💳</span>
          <span>💳</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
