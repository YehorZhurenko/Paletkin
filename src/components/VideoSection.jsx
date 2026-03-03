import React from 'react'
import './VideoSection.css'

import logoPlaceholder from '../assets/image/logo/orange-logo.svg'



export default function VideoSection({
  title = 'Видео про нас',
  description = 'Посмотрите, как устроена наша работа изнутри: от приема заявки до разгрузки на пандусе маркетплейса. Мы показываем реальные процессы склада, чтобы вы были уверены в надежности логистики.',
  extra = 'В этом видео рассказываем, как мы упаковываем товары по строгим регламентам площадок, как контролируем сохранность груза в пути и решаем спорные вопросы при приемке. Узнайте, кто стоит за доставкой ваших заказов и почему нам доверяют тысячи селлеров.',
  videoSrc = null
}) {
  return (
    <section className="video-section">
      <div className="video-section-content">
        <div className="video-section-text">
          <h2 className="video-section-title">{title}</h2>
          <p className="video-section-desc">{description}</p>
          {extra && <p className="video-section-desc">{extra}</p>}
        </div>
        <div className="video-section-player">
          {videoSrc ? (
            <video controls className="video-section-video">
              <source src={videoSrc} />
            </video>
          ) : (
            <div className="video-section-placeholder">
              <img src={logoPlaceholder} alt="Палеткин" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
