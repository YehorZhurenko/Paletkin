import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

import logo from '../assets/image/logo/logo.svg';
import big_logo from '../assets/image/logo/big-logo.svg';


import icon_fb from '../assets/image/icons/social/fb.svg';
import icon_ig from '../assets/image/icons/social/ig.svg';
import icon_x from '../assets/image/icons/social/x.svg';
import icon_li from '../assets/image/icons/social/linkedin.svg';
import icon_yb from '../assets/image/icons/social/yb.svg';


function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    alert(`Спасибо за подписку! На ${email} будут отправляться новости.`)
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="container">
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        
          <div className="newsletter-wrapper">
            <div className="newsletter-content">
              <h2>Подписка на рассылку</h2>
              <p>Подпишитесь на нашу рассылку, чтобы получать новости и специальные предложения</p>
            </div>
            <div className="newsletter-action">
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                    <input
                        type="email"
                        placeholder="Эл. почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Подписаться</button>
                </form>
                <span>Нажимая кнопку, вы соглашаетесь получать рекламу, письма, акции и другие полезности.</span>
            </div>
            
          </div>
        
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
          <div className="footer-content">
            {/* Left Column - Company Info */}
            <div className="footer-info">
              <div className="footer-company">
                <div className="company-logo">
                  <img src={logo} alt="logo" />
                </div>
                
                <div className="social-links">
                  <a href="#" className="social-icon" title="Facebook">
                    <img src={icon_fb} alt="Facebook" />
                  </a>
                  <a href="#" className="social-icon" title="Instagram">
                    <img src={icon_ig} alt="Instagram" />
                  </a>
                  <a href="#" className="social-icon" title="Twitter">
                    <img src={icon_x} alt="Twitter" />
                  </a>
                  <a href="#" className="social-icon" title="LinkedIn">
                    <img src={icon_li} alt="LinkedIn" />
                  </a>
                  <a href="#" className="social-icon" title="YouTube">
                    <img src={icon_yb} alt="YouTube" />
                  </a>
                </div>
              </div>             
                
              <div className="company-details">
                <div className="detail-block">
                  <h4>Адрес</h4>
                  <p>Россия, 105118, г. Москва, ул. Вольная д. 25, офис 2027</p>
                </div>

                <div className="detail-block">
                  <h4>Время работы</h4>
                  <p>Пн-Сб: 9:00-18:00</p>
                </div>

                <div className="detail-block">
                  <h4>Контакт</h4>
                  <p><a href="tel:+79933430444">+7 (993) 343-04-44</a></p>
                  <p><a href="mailto:logistic@paletkin.pro">logistic@paletkin.pro</a></p>
                </div>
              </div>
            </div>
            
            {/* Middle & Right Columns - Links */}
            <div className="footer-links-grid">
              <div className="footer-link-column">
                <ul>
                  <li><Link to="/calculator">Все услуги</Link></li>
                  <li><Link to="/services">Доставка на <br /> маркетплейсы</Link></li>
                  <li><Link to="/documents">Документы</Link></li>
                </ul>
              </div>

              <div className="footer-link-column">  
                <ul>
                  <li><a href="#blog">Кейсы</a></li>
                  <li><Link to="/about">О компании</Link></li>
                  <li><Link to="/contacts">Контакты</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                  <li><a href="#blog">Блог</a></li>
                </ul>
              </div>
            </div>
          </div>
      </div>
      

      {/* Footer Bottom */}
      <div className="footer-bottom">
          <div className="footer-bottom-content">
            
            <p className="copyright">© 2025 Paletkin. Все права защищены.</p>
            <div className="footer-legal">
              <a href="#cookies">Настройки cookies</a>
              <a href="#terms">Условия использования сервиса</a>
              <a href="#privacy">Политика конфиденциальности</a>
            </div>
            
          </div>
      </div>

      {/* Logo Bottom */}
      
      <img src={big_logo} alt="Paletkin Logo" className="footer-logo-bottom"/>
      
    </div>
    </footer>
  )
}

export default Footer