import React from 'react'
import './Home.css'

import logo from '../assets/image/main-banner/logo.png'
import logo3d from '../assets/image/main-banner/logo3d.png'
import boxes from '../assets/image/main-banner/boxes.png'

import CalculatorComponent from '../components/Calculator'
import ServiceSection from '../components/ServicesComponent'
import PartnersSection from '../components/PartnersSection'
import DifferentSection from '../components/DifferentSection'
import CarsSection from '../components/CarsSection'
import StepsSection from '../components/StepsSection'
import ReviewsSection from '../components/ReviewsSection'
import WhyUsSection from '../components/WhyUs'
import FaqSection from '../components/FaqSection'
import OfferSection from '../components/OfferSection'
import DeliverySection from '../components/DeliverySection'
import TariffSection from '../components/TariffsSection';
import BlogSection from '../components/BlogSection';
import VideoSection from '../components/VideoSection';

import companys from '../assets/image/partners/companys.svg'

import globe from '../assets/image/offer/globe.png'
import quolty from '../assets/image/offer/quolty.png'
import dlvry from '../assets/image/offer/dlvry.png'
import marketplace from '../assets/image/offer/marketplace.png'


function Home() {
  return (
    <section className="home">
      <div className="home-banner">
        <img src={boxes} alt="Boxes" />
        <img src={logo3d} alt="Logo 3D" />
      </div>

      <div className="home-offer">
        <div className="container">
          <div className="home-offer-content">
            <div className="home-offer-text">
              <p>Надежная и быстрая доставка на Wildberries, Ozon, Яндекс.Маркет <br />и другие маркетплейсы.</p>
              <h2>Доставка <br />на маркетплейсы <br /><span>по всей России</span> 
              <img src={companys} alt="Партнеры" />
              </h2>
            </div>
            <div className="home-offer-blocks">
              <div className="home-blocks-item">
                <div className="home-blocks-image">
                  <img src={dlvry} alt="Delivery" />
                </div>
                <div className="home-blocks-text">
                  Надежная доставка
                </div>
              </div>
              <div className="home-blocks-item">
                <div className="home-blocks-image">
                  <img src={marketplace} alt="Marketplace" />
                </div>
                <div className="home-blocks-text">
                  Маркетплейсы
                </div>
              </div>
              <div className="home-blocks-item">
                <div className="home-blocks-image">
                  <img src={quolty} alt="Quality" />
                </div>
                <div className="home-blocks-text">
                  Гарантия качества
                </div>
              </div>
              <div className="home-blocks-item">
                <div className="home-blocks-image">
                  <img src={globe} alt="Globe" />
                </div>
                <div className="home-blocks-text">
                  Широкая география
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-calculator">
        <div className="container">
          <CalculatorComponent />
        </div>
      </div>

      <DeliverySection title="Доставка в популярные маркетплейсы" subtitle="Предоставляем профессиональные решения для доставки товаров на ведущие торговые площадки России с соблюдением всех требований маркетплейсов." />

      <div className="home-services">
        <div className="container">
          <ServiceSection title='Наши услуги'
          subtitle='Мы предлагаем комплексные логистические решения для эффективного управления цепочками поставок и доставки товаров на ведущие маркетплейсы России.'/>
        </div>
      </div>
      
      <PartnersSection />

      <div className="home-tariff">
        <div className="container">
          <TariffSection />
        </div>
      </div>

      <div className="home-video">
        <div className="container">
          <VideoSection />
        </div>
      </div>

      <div className="home-different">
        <div className="container">
          <DifferentSection />
        </div>
      </div>

      <div className="home-cars">
        <div className="container">
          <CarsSection />
        </div>
      </div>

      <div className="home-blog">
        <div className="container">
          <BlogSection />
        </div>
      </div>

      <div className="home-steps">
        <div className="container">
          <StepsSection />
        </div>
      </div>

      <div className="home-reviews">
        <div className="container">
          <ReviewsSection />
        </div>
      </div>

      <div className="home-whyus">
        <div className="container">
          <WhyUsSection />
        </div>
      </div>


      <div className="home-faq">
        <div className="container">
          <FaqSection
            title="Ответы на вопросы"
            subtitle="Если вы все еще имеете вопросы о документах и сервисах"
            linkTo="/faq"
            linkText="Перейти в раздел FAQ"
          />
      </div>

      <OfferSection />
      </div>
    </section>
  )
}

export default Home
