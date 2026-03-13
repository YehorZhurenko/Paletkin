import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Header.css'

import logo from '../assets/image/logo/logo-black.svg'
import logoCompact from '../assets/image/icons/header/logo.svg'
import servicesIcon from '../assets/image/icons/header/services.svg'
import deliveryIcon from '../assets/image/icons/header/delivery.svg'
import docsIcon from '../assets/image/icons/header/docs.svg'
import phoneIcon from '../assets/image/icons/header/phone.svg'
import vanIcon from '../assets/image/icons/header/van.svg'
import calculatorHeader from '../assets/image/calculator-header.png'
import aboutHeader from '../assets/image/about-header.png'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef(null)
  const dropdownMenuRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const burgerButtonRef = useRef(null)
  const servicesMenuItems = [
    {
      to: '/services',
      icon: servicesIcon,
      title: 'Все услуги',
      description: 'Прозрачные цены без скрытых комиссий'
    },
    {
      to: '/marketplace',
      icon: deliveryIcon,
      title: 'Доставка на маркетплейсы',
      description: 'Срочная доставка в России и СНГ'
    },
    {
      to: '/documents',
      icon: docsIcon,
      title: 'Документы',
      description: 'Срочная доставка в России и СНГ'
    }
  ]

  const featuredBlocks = [
    {
      to: '/calculator',
      image: calculatorHeader,
      title: 'Калькулятор',
      description: 'Расчет стоимости на всю логистику'
    },
    {
      to: '/about',
      image: aboutHeader,
      title: 'О компании',
      description: 'Убедитесь в нашей компетентности'
    }
  ]

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      const target = e.target
      // If click is inside the toggle (dropdownRef) or inside the opened menu, do nothing
      if (dropdownRef.current && dropdownRef.current.contains(target)) return
      if (dropdownMenuRef.current && dropdownMenuRef.current.contains(target)) return
      if (burgerButtonRef.current && burgerButtonRef.current.contains(target)) return
      if (mobileMenuRef.current && mobileMenuRef.current.contains(target)) return
      setMenuOpen(false)
      setMobileMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isServicesActive = ['/services', '/marketplace', '/documents'].some((path) =>
    location.pathname.startsWith(path)
  )

  return (
    <header className="site-header">
      <div className="container">

        <nav className="main-nav">
          <ul>

            <li>
              <Link to="/" className="logo">
                <img src={logo} alt="Paletkin" className="logo-default" />
                <img src={logoCompact} alt="Paletkin" className="logo-compact" />
              </Link>
            </li>

            <li className="has-dropdown" ref={dropdownRef}>
              <button
                className={`dropdown-toggle ${isServicesActive ? 'active' : ''}`}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
              >
                Услуги
                <span className={`arrow ${menuOpen ? 'open' : ''}`}>
                  <span className="arrow-icon" aria-hidden="true" />
                </span>
              </button>
            </li>

            <li>
              <NavLink to="/online-table" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Онлайн‑таблица
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Контакты
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                FAQ
              </NavLink>
            </li>
            <li>
              <div className="header-actions">
                <a href="tel:+79933430444" className="phone">
                  <img src={phoneIcon} alt="" className="phone-icon" />
                  +7 (993) 343‑04‑44
                </a>
                <Link to="/checkout" className="order-btn">
                  <span className="order-btn-text">Оформить заказ</span>
                  <img src={vanIcon} alt="" className="order-btn-icon" />
                </Link>
                <button
                  type="button"
                  ref={burgerButtonRef}
                  className={`burger-toggle ${mobileMenuOpen ? 'open' : ''}`}
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                >
                  <span />
                  <span />
                  <span />
                </button>
              </div>
            </li>
          </ul>
        </nav>
        
        <div className={`dropdown-menu ${menuOpen ? 'open' : ''}`} ref={dropdownMenuRef}>
          <p className="services-list-title">Услуги</p>
          <div className="dropdown-menu-content">

            <div className="dropdown-col services-list">
              
              <ul>
                {servicesMenuItems.map((item) => (
                  <li key={item.title}>
                    <Link to={item.to} onClick={() => setMenuOpen(false)}>
                      <img src={item.icon} alt="" />
                      <div className="text">
                        <span className="title">{item.title}</span>
                        <span className="desc">{item.description}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="featured-blocks">
              {featuredBlocks.map((block) => (
                <Link
                  key={block.title}
                  to={block.to}
                  className="featured-block"
                  onClick={() => setMenuOpen(false)}
                  style={{ backgroundImage: `url(${block.image})` }}
                >
                  <div className="featured-content">
                    <h3>{block.title}</h3>
                    <p>{block.description}</p>
                  </div>
                  <span className="featured-arrow">
                    <span className="featured-arrow-icon" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} ref={mobileMenuRef}>
   

          <div className="mobile-nav-links">
            <NavLink to="/online-table" onClick={() => setMobileMenuOpen(false)}>
              Онлайн таблица
            </NavLink>
            <NavLink to="/contacts" onClick={() => setMobileMenuOpen(false)}>
              Контакты
            </NavLink>
            <NavLink to="/faq" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </NavLink>
            <NavLink to="/services" onClick={() => setMobileMenuOpen(false)}>
              Услуги
            </NavLink>
          </div>

          <div className="mobile-menu-services">
            <div className="services-list">
              <ul>
                {servicesMenuItems.map((item) => (
                  <li key={`mobile-${item.title}`}>
                    <Link to={item.to} onClick={() => setMobileMenuOpen(false)}>
                      <img src={item.icon} alt="" />
                      <div className="text">
                        <span className="title">{item.title}</span>
                        <span className="desc">{item.description}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="featured-blocks mobile-featured-blocks">
              {featuredBlocks.map((block) => (
                <Link
                  key={`mobile-featured-${block.title}`}
                  to={block.to}
                  className="featured-block"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ backgroundImage: `url(${block.image})` }}
                >
                  <div className="featured-content">
                    <h3>{block.title}</h3>
                    <p>{block.description}</p>
                  </div>
                  <span className="featured-arrow">
                    <span className="featured-arrow-icon" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>


        </div>
      </div>
    </header>
  )
}

export default Header
