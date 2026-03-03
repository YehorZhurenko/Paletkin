import React, { useState, useRef, useEffect, useCallback } from 'react'
import './BlogSection.css'

import blogImg1 from '../assets/image/blog/img-container.png'
import blogImg2 from '../assets/image/blog/img-container-1.png'
import blogImg3 from '../assets/image/blog/img-container-2.png'
import blogImg4 from '../assets/image/blog/img-container-3.png'

const defaultPosts = [
  {
    image: blogImg1,
    tag: 'Инструкция',
    title: 'Доставка день в день',
    text: 'Груз уходит утром, приходит вечером. Срочная доставка — это не обещание,...'
  },
  {
    image: blogImg2,
    tag: 'Новости',
    title: 'Как перевозить электронику',
    text: 'Благодаря оптимизированной логистике, доставка день в день стала...'
  },
  {
    image: blogImg3,
    tag: 'Новости',
    title: 'Как не потерять посылку',
    text: 'Узнайте, как правильно упаковать электронику, чтобы избежать поврежд...'
  },
  {
    image: blogImg4,
    tag: 'Новости',
    title: 'Как работает фулфилмент',
    text: 'Советы экспертов о том, как обеспечить сохранность вашей посылки на каждо...'
  }
]

export default function BlogSection({
  title = 'Читайте наш блог',
  posts = defaultPosts,
  telegramLink = '#'
}) {
  const [step, setStep] = useState(0)
  const sliderRef = useRef(null)
  const trackRef = useRef(null)
  const [maxStep, setMaxStep] = useState(0)
  const [offset, setOffset] = useState(0)

  const measure = useCallback(() => {
    if (!trackRef.current || !sliderRef.current) return
    const trackWidth = trackRef.current.scrollWidth
    const viewWidth = sliderRef.current.offsetWidth
    const overflow = trackWidth - viewWidth
    if (overflow <= 0) {
      setMaxStep(0)
      setOffset(0)
      setStep(0)
      return
    }

    const cards = trackRef.current.children
    if (!cards.length) return

    const stepOffsets = [0]
    for (let i = 1; i < cards.length; i++) {
      const cardLeft = cards[i].offsetLeft
      const snap = cardLeft
      if (snap >= overflow) {
        stepOffsets.push(overflow)
        break
      }
      stepOffsets.push(snap)
    }
    if (stepOffsets[stepOffsets.length - 1] < overflow) {
      stepOffsets.push(overflow)
    }

    const newMax = stepOffsets.length - 1
    setMaxStep(newMax)

    setStep((prev) => {
      const clamped = Math.min(prev, newMax)
      setOffset(stepOffsets[clamped])
      return clamped
    })

    trackRef.current._stepOffsets = stepOffsets
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure, posts.length])

  const goTo = (newStep) => {
    const offsets = trackRef.current?._stepOffsets
    if (!offsets) return
    const clamped = Math.max(0, Math.min(newStep, maxStep))
    setStep(clamped)
    setOffset(offsets[clamped])
  }

  return (
    <section className="blog-section">
      <div className="blog-section-top">
        <h2 className="blog-section-title">{title}</h2>
        <div className="blog-section-buttons">
          <button onClick={() => goTo(step - 1)} className="slider-btn prev" disabled={step === 0}>
            ❮
          </button>
          <button onClick={() => goTo(step + 1)} className="slider-btn next" disabled={step >= maxStep}>
            ❯
          </button>
        </div>
      </div>

      <div className="blog-section-slider" ref={sliderRef}>
        <div
          ref={trackRef}
          className="blog-section-track"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {posts.map((post, idx) => (
            <article key={idx} className="blog-card">
              <div className="blog-card-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-card-body">
                <span className="blog-card-tag">{post.tag}</span>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-text">{post.text}</p>
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
        className="blog-slider-range"
      />

      <a href={telegramLink} className="blog-section-tg-btn">
        Перейти в наш телеграм
      </a>
    </section>
  )
}
