import { useState } from 'react'
import './Checkout.css'

import FaqSection from '../components/FaqSection'
import DocumentsCtaSection from '../components/DocumentsCtaSection'
import CalculatorComponent from '../components/Calculator'
import TopDesc from '../components/TopDesc'
import Breadcrumbs from '../components/Breadcrumbs'
import OfferSection from '../components/OfferSection'

import fire from "../assets/image/icons/fire.svg"

function Checkout() {

  return (
    <div className="page">
      <div className="page__breadcrumbs">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Оформление заказа' }]} />
        </div>
      </div>
      <div className="page__content">
    <section className="checkout-page">
      <div className="checkout-top">
        <div className="container">
          <div className="checkout-top-content">
              <TopDesc
                title="Оформление заказа"
                body="Заполните форму для надёжной организации доставки. Все заявки обрабатываются в течение 15 минут."
              />
          </div>
        </div>
      </div>
      <div className="checkout-offer">
        <div className="container">
          <div className="checkout-offer-content">
            <div className="checkout-offer-hot">
              <img src={fire} alt="Hot offer" />
              Только при заказе через сайт
            </div>
            <h3>Скидка 50%</h3>
            <p>На первый заказ в составе сборного грузка</p>
          </div>
        </div>
      </div>
      <div className="container">
        <CalculatorComponent mode='checkout' />
      </div>
      <div className="container">
          <FaqSection
            title="Ответы на вопросы"
            subtitle="Если вы все еще имеете вопросы о документах и сервисах"
            linkTo="/faq"
            linkText="Перейти в раздел FAQ"
          />
      </div>

      <OfferSection />
      
    </section>
      </div>
    </div>
  )
}

export default Checkout
