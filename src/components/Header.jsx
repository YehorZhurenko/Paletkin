import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

import logo from '../assets/image/logo/logo-black.svg'
import servicesIcon from '../assets/image/icons/header/services.svg'
import deliveryIcon from '../assets/image/icons/header/delivery.svg'
import docsIcon from '../assets/image/icons/header/docs.svg'
import calculatorHeader from '../assets/image/calculator-header.png'
import aboutHeader from '../assets/image/about-header.png'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const dropdownMenuRef = useRef(null)
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
      to: '/online-table',
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
      setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="site-header">
      <div className="container">

        <nav className="main-nav">
          <ul>

            <li>
              <Link to="/" className="logo">
                <img src={logo} alt="Paletkin" />
              </Link>
            </li>

            <li className="has-dropdown" ref={dropdownRef}>
              <button
                className="dropdown-toggle"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
              >
                Услуги
                <span className={`arrow ${menuOpen ? 'open' : ''}`}>⌄</span>
              </button>
            </li>

            <li>
              <Link to="/online-table">Онлайн‑таблица</Link>
            </li>
            <li>
              <Link to="/contacts">Контакты</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <div className="header-actions">
                <a href="tel:+79933430444" className="phone">
                  <svg className="phone-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.13 1.17A1 1 0 0 1 4.17.5h1.6a1 1 0 0 1 .98.82l.3 1.8a1 1 0 0 1-.29.86l-1.02 1.01a8.38 8.38 0 0 0 3.27 3.27l1.01-1.02a1 1 0 0 1 .86-.29l1.8.3a1 1 0 0 1 .82.98v1.6a1 1 0 0 1-.67 1.04l-1.2.4a2.8 2.8 0 0 1-2.66-.45 15.26 15.26 0 0 1-4.79-4.79 2.8 2.8 0 0 1-.45-2.66l.4-1.2Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  +7 (993) 343‑04‑44
                </a>
                <Link to="/checkout" className="order-btn">
                  Оформить заказ
                </Link>
              </div>
            </li>
          </ul>
        </nav>
        <div className={`dropdown-menu ${menuOpen ? 'open' : ''}`} ref={dropdownMenuRef}>
          <div className="dropdown-col services-list">
            <p className="services-list-title">Услуги</p>
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

          <div className="dropdown-col extra-info">
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
                  <span className="featured-arrow">›</span>
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
