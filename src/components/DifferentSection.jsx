import React from 'react'

import './DifferentSection.css'
import gear from '../assets/image/different/gear.png'
import van from '../assets/image/different/van.png'
import box from '../assets/image/different/box.png'
import folder from '../assets/image/different/folder.png'
import SliderBase from './SliderBase'

const slidesData = [
  {
    img: gear,
    title: 'Доставка день в день',
    text: 'Экспресс доставка грузов по Москве и Московской области в день заказа'
  },
  {
    img: van,
    title: 'Легальность и штат',
    text: 'Работа исключительно с лицензированными перевозчиками и нанятыми водителями'
  },
  {
    img: box,
    title: 'Собственный автопарк',
    text: 'Более 200 машин на балансе компании позволяют гарантировать сроки'
  },
  {
    img: folder,
    title: 'Технология',
    text: 'Собственная система отслеживания и управления логистикой в реальном времени'
  }
]

function DifferentSection() {
  return (
    <section className="different">
      <div className="container">
        <div className="different-content">
          <SliderBase items={slidesData}>
            {({ step, maxStep, goTo, sliderRef, trackRef, offset, swipeHandlers }) => (
              <>
                <div className="different-top">
                  <h2 className="different-title">Что отличает нас</h2>
                  <div className="different-buttons">
                    <button
                      onClick={() => goTo(step - 1)}
                      className="slider-btn prev"
                      disabled={step === 0}
                    >
                      ❮
                    </button>
                    <button
                      onClick={() => goTo(step + 1)}
                      className="slider-btn next"
                      disabled={step >= maxStep}
                    >
                      ❯
                    </button>
                  </div>
                </div>
                <div className="different-slider" ref={sliderRef}>
                  <div
                    className="slider-track"
                    ref={trackRef}
                    style={{ transform: `translateX(-${offset}px)` }}
                    {...swipeHandlers}
                  >
                    {slidesData.map((slide, idx) => (
                      <div key={idx} className="feature-card">
                        <img src={slide.img} alt={slide.title} className="card-image" />
                        <h3>{slide.title}</h3>
                        <p>{slide.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxStep}
                  value={step}
                  onChange={(e) => goTo(Number(e.target.value))}
                  className="slider-range"
                />
              </>
            )}
          </SliderBase>
      </div>
      </div>
    </section>
  )
}

export default DifferentSection

