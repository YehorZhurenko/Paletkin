import { useState } from 'react'
import './FAQ.css'

import FaqSection from '../components/FaqSection'
import Breadcrumbs from '../components/Breadcrumbs'
import OfferSection from '../components/OfferSection'

function FAQ() {
  const [expandedFaq, setExpandedFaq] = useState(0)

  return (
    <div className="page">
      <div className="page__breadcrumbs">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'FAQ' }]} />
        </div>
      </div>
      <div className="page__content">
    <div className="faq-page">
      <section className="faq-section">
        <div className="container">
          <div className="faq-top">
            <div className="faq-top-left">
              <h2>Ответы на вопросы</h2>
              <p>Всё, что нужно знать о доставке с Paletkin, в одном месте</p>
            </div>
            <div className="faq-top-right">
              <div className="faq-top-items faq-top-items--active">
                Общие вопросы
              </div>
              <div className="faq-top-items">
                Доставка и сроки
              </div>
              <div className="faq-top-items">
                Типы грузов
              </div>
              <div className="faq-top-items">
                Цена и оплата
              </div>
              <div className="faq-top-items">
                Страхование
              </div>
              <div className="faq-top-items">
                Документация
              </div>
              <div className="faq-top-items">
                Решение проблем
              </div>
            </div>
          </div>

        </div>
        <FaqSection
            title="Общие вопросы"
            subtitle="Если вы все еще имеете вопросы о документах и сервисах"
          />
          <OfferSection />
      </section>
    </div>
      </div>
    </div>
  )
}

export default FAQ
