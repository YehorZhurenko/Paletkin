import './About.css'

import logo from '../assets/image/logo/orange-logo.svg'
import patner from '../assets/image/icons/partner.svg'
import deliveryFull from '../assets/image/delivery.png'
import deliveryShort from '../assets/image/delivery-short.png'

import specialist1 from '../assets/image/specialist/specialist-card.png'
import specialist2 from '../assets/image/specialist/specialist-card2.png'
import specialist3 from '../assets/image/specialist/specialist-card3.png'
import specialist4 from '../assets/image/specialist/specialist-card4.png'
import specialist5 from '../assets/image/specialist/specialist-card5.png'
import specialist6 from '../assets/image/specialist/specialist-card6.png'
import specialist7 from '../assets/image/specialist/specialist-card7.png'

import { useEffect, useState } from 'react'

import TopDesc from '../components/TopDesc'
import Breadcrumbs from '../components/Breadcrumbs'
import DifferentSection from '../components/DifferentSection'
import CarsSection from '../components/CarsSection'
import StepsSection from '../components/StepsSection'
import PartnersSection from '../components/PartnersSection'
import ReviewsSection from '../components/ReviewsSection'
import OfferSection from '../components/OfferSection'
import SliderBase from '../components/SliderBase'

function About() {
  const specialists = [
    { img: specialist1, name: 'Алексей Волков', job: 'Руководитель отдела продаж' },
    { img: specialist2, name: 'Макар Сергеев', job: 'Ведущий логист' },
    { img: specialist3, name: 'Екатерина Белова', job: 'Финансовый директор' },
    { img: specialist4, name: 'Артем Морозов', job: 'Менеджер по развитию' },
    { img: specialist5, name: 'Давид Смирнов', job: 'HR-менеджер' },
    { img: specialist6, name: 'Ольга Яковлева', job: 'Технический директор' },
    { img: specialist7, name: 'Игорь Петров', job: 'Юрист' }
  ]

  const [specialistIndex, setSpecialistIndex] = useState(0)
  const [useSpecialistSlider, setUseSpecialistSlider] = useState(false)

  const handleSpecialistPrev = () => {
    setSpecialistIndex((idx) => (idx > 0 ? idx - 1 : specialists.length - 1))
  }

  const handleSpecialistNext = () => {
    setSpecialistIndex((idx) => (idx < specialists.length - 1 ? idx + 1 : 0))
  }

  useEffect(() => {
    const updateMode = () => {
      if (typeof window === 'undefined') return
      setUseSpecialistSlider(window.innerWidth < 1500)
    }

    updateMode()
    window.addEventListener('resize', updateMode)

    return () => {
      window.removeEventListener('resize', updateMode)
    }
  }, [])

  return (
    <div className="page">
      <div className="page__breadcrumbs">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'О компании' }]} />
        </div>
      </div>
      <div className="page__content">
    <div className="about-page">
      <section className="intro-section">
        <div className="container">
          <TopDesc title="О компании" body="Мы специализируемся на грузоперевозках для B2B-сегмента и поставщиков маркетплейсов. Наш приоритет — комплексный подход: от экспресс-доставки до полного экспедирования грузов. Мы знаем требования торговых площадок и понимаем ценность времени в бизнесе, поэтому гарантируем надежность и контроль на каждом этапе пути." />
        </div>
      </section>

      <section className="partner-about">
        <div className="container">
          <div className="partner-about-content">
            <div className="partner-about-text">
              <p className="partner-about-title">
                Надёжный партнёр <br/> по транспортной и логистической доставке для <span className="highlight">B2B и маркетплейсов <br/> в России и СНГ</span>
                <img src={patner} alt="partner-about Icon" />
              </p>
            </div>
            <div className="partner-about-image">
              <img src={logo} alt="Paletkin Logo" />
            </div>
          </div>
        </div>
      </section>

      <section className='statistic'>
        <div className="container">
          <div className="statistic-content">
            <div className="statistic-item">
              <div className="statistic-title">Доставок в месяц</div>
              <span className="statistic-count">15000+</span>
            </div>

            <div className="statistic-item">
              <div className="statistic-title">Городов России</div>
              <div className="statistic-count">50+</div>
            </div>

            <div className="statistic-item">
              <div className="statistic-title">Машин в автопарке</div>
              <div className="statistic-count">200+</div>
            </div>

            <div className="statistic-item">
              <div className="statistic-title">Среднее время доставки</div>
              <div className="statistic-count">4ч</div>
            </div>
          </div>
        </div>
      </section>

      <section className="delivery">
        <div className="container">
          <div className="delivery-content">
        
            <div className="delivery-title">
              Честность, скорость <br/>и технология в каждой доставке
            </div>

            <div className="delivery-idea">
              <p>
                Paletkin родилась из простой идеи — доставлять грузы так, как обещаешь. Без отговорок, без задержек, без лишних слов. Мы начали с одного автомобиля и верой в то, что клиент заслуживает честного отношения.
              </p>
              <div className="delivery-list">
                <span>
                  То, что вызывает уважение при работе с нами:
                </span>
                <ul>
                  <li>Скорость</li>
                  <li>Доставка день в день</li>
                  <li>Личные менеджеры, готовые помочь</li>
                </ul>
              </div>
            </div>
            
            <div className="delivery-body">
              <picture>
                <source media="(max-width: 1400px)" srcSet={deliveryFull} />
                <img src={deliveryShort} alt="Delivery" />
              </picture>
              <button className="delivery-button">Скачать презентацию компании</button>
            </div>
          </div>
        </div>
      </section>

      <DifferentSection />

      <CarsSection />
      
      <section className="specialist">
        <div className="container">
          <div className="specialist-content">
            {useSpecialistSlider ? (
              <SliderBase items={specialists}>
                {({ step, maxStep, goTo, sliderRef, trackRef, offset, swipeHandlers }) => (
                  <>
                    <div className="specialist-header">
                      <div className="specialist-header-text">
                        <h2 className="specialist-title">Люди, которые делают Paletkin лучше</h2>
                        <p className="specialist-subtitle">
                          Каждый здесь знает, что значит доставить груз честно и вовремя
                        </p>
                      </div>
                      <div className="specialist-controls">
                        <button
                          type="button"
                          className="slider-btn prev"
                          onClick={() => goTo(step - 1)}
                          disabled={step === 0}
                        >
                          ❮
                        </button>
                        <button
                          type="button"
                          className="slider-btn next"
                          onClick={() => goTo(step + 1)}
                          disabled={step >= maxStep}
                        >
                          ❯
                        </button>
                      </div>
                    </div>
                    <div className="specialist-slider" ref={sliderRef}>
                      <div
                        className="specialist-track"
                        ref={trackRef}
                        style={{ transform: `translateX(-${offset}px)` }}
                        {...swipeHandlers}
                      >
                        {specialists.map((s, i) => (
                          <div
                            key={i}
                            className="specialist-item specialist-item--slide"
                            style={{ backgroundImage: `url(${s.img})` }}
                          >
                            <div className="specialist-info">
                              <div className="specialist-name">{s.name}</div>
                              <div className="specialist-job">{s.job}</div>
                            </div>
                          </div>
                        ))}
                        <div className="specialist-item specialist-placeholder specialist-item--slide">
                          <div className="specialist-info specialist-info--center">
                            <div className="specialist-count">100+</div>
                            <div className="specialist-desc">
                              Членов команды работают над Paletkin каждый день
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={maxStep}
                      value={step}
                      onChange={(e) => goTo(Number(e.target.value))}
                      className="specialist-slider-range"
                    />
                  </>
                )}
              </SliderBase>
            ) : (
              <>
                <div className="specialist-header">
                  <div className="specialist-header-text">
                    <h2 className="specialist-title">Люди, которые делают Paletkin лучше</h2>
                    <p className="specialist-subtitle">
                      Каждый здесь знает, что значит доставить груз честно и вовремя
                    </p>
                  </div>
                  <div className="specialist-controls">
                    <button
                      type="button"
                      className="slider-btn prev"
                      onClick={handleSpecialistPrev}
                    >
                      ❮
                    </button>
                    <button
                      type="button"
                      className="slider-btn next"
                      onClick={handleSpecialistNext}
                    >
                      ❯
                    </button>
                  </div>
                </div>
                <div className="specialist-grid">
                  {specialists.map((s, i) => (
                    <div
                      key={i}
                      className={`specialist-item${
                        i === specialistIndex ? ' specialist-item--active' : ''
                      }`}
                      style={{ backgroundImage: `url(${s.img})` }}
                    >
                      <div className="specialist-info">
                        <div className="specialist-name">{s.name}</div>
                        <div className="specialist-job">{s.job}</div>
                      </div>
                    </div>
                  ))}
                  <div className="specialist-item specialist-placeholder">
                    <div className="specialist-info specialist-info--center">
                      <div className="specialist-count">100+</div>
                      <div className="specialist-desc">
                        Членов команды работают над Paletkin каждый день
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <StepsSection />

      <PartnersSection />

      <ReviewsSection />
      
      <OfferSection />

    </div>
      </div>
    </div>
  )
}

export default About
