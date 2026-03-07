import React from 'react'

import './ReviewsSection.css'
import sdek from '../assets/image/partners/review/sdek.svg'
import lamoda from '../assets/image/partners/review/lamoda.svg'
import ozon from '../assets/image/partners/review/ozon.svg'

import avatar1 from '../assets/image/avatars/avatar1.png'
import avatar2 from '../assets/image/avatars/avatar2.png'
import avatar3 from '../assets/image/avatars/avatar3.png'
import SliderBase from './SliderBase'

const reviewsData = [
  {
    logo: sdek,
    avatar: avatar1,
    company: 'СДЭК',
    title: 'Доставка день в день',
    text: '«День в день — это не миф. Заказал утром, груз уже в Москве вечером. Честные люди, честные цены.»',
    author: 'Иван Петров',
    role: 'Логист, СДЭК'
  },
  {
    logo: lamoda,
    avatar: avatar2,
    company: 'Lamoda',
    title: 'Экспресс-доставка',
    text: '«С Paletkin ни разу не забыли о задержках! Всегда вовремя, всегда чётко. Рекомендую всем, кто ценит своё время.»',
    author: 'Артур Кузнецов',
    role: 'Владелец магазина, Lamoda'
  },
  {
    logo: ozon,
    avatar: avatar3,
    company: 'OZON',
    title: 'Моментальная доставка',
    text: '«Благодаря Paletkin, наши товары доставляются клиентам быстрее и удобнее — это экономит наше время и деньги.»',
    author: 'Светлана Орлова',
    role: 'Менеджер, Ozon'
  }
]

function ReviewsSection() {
  return (
    <section className="reviews">
      <div className="container">
        <div className="reviews-content">
          <SliderBase items={reviewsData}>
            {({ step, maxStep, goTo, sliderRef, trackRef, offset, swipeHandlers }) => (
              <>
                <div className="reviews-top">
                  <div>
                    <h2 className="reviews-title">Отзывы клиентов</h2>
                    <p className="reviews-subtitle">Что говорят те, кто уже работает с нами</p>
                  </div>
                  <div className="reviews-buttons">
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

                <div className="reviews-slider" ref={sliderRef}>
                  <div
                    className="reviews-track"
                    ref={trackRef}
                    style={{ transform: `translateX(-${offset}px)` }}
                    {...swipeHandlers}
                  >
                    {reviewsData.map((review, idx) => (
                      <article key={idx} className="review-card">
                        <img src={review.logo} alt={review.company} className="review-logo" />
                        <h3 className="review-title">{review.title}</h3>
                        <p className="review-text">{review.text}</p>
                        <div className="review-footer">
                          <div className="review-author">
                            <div className="review-author-avatar">
                              <img src={review.avatar} alt={review.author} />
                            </div>
                            <div className="review-author-info">
                              <div className="review-author-name">{review.author}</div>
                              <div className="review-author-role">{review.role}</div>
                            </div>
                          </div>
                          <button className="review-button">Перейти к кейсу</button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxStep}
                  value={step}
                  onChange={(e) => goTo(Number(e.target.value))}
                  className="reviews-slider-range"
                />
              </>
            )}
          </SliderBase>
      </div>
      </div>
    </section>
  )
}

export default ReviewsSection

