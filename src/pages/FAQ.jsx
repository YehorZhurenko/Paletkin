import { useState } from 'react'
import './FAQ.css'

function FAQ() {
  const [expandedFaq, setExpandedFaq] = useState(0)
  const faqs = [
    {
      question: 'Как рассчитать стоимость?',
      answer: 'Стоимость рассчитывается на основе веса груза, расстояния доставки и выбранного типа услуги. Используйте наш калькулятор для быстрого расчета.'
    },
    {
      question: 'Работаете ли вы ночью?',
      answer: 'Да, доставляем круглосуточно. День и ночь - мы здесь, чтобы доставить вашу посылку вовремя. Срочность не значит расписание.'
    },
    {
      question: 'Какие города охватываете?',
      answer: 'Работаем в 50+ городов России и СНГ. Если вашего города нет в списке - свяжитесь с нами и мы уточним возможность доставки в ваш регион.'
    },
    {
      question: 'Нужна ли регистрация?',
      answer: 'Нет, но регистрация помогает получить доступ к личному кабинету с историей заказов, сохраненными адресами и специальными предложениями.'
    },
    {
      question: 'Как отследить груз?',
      answer: 'После оформления заказа получите уникальный номер для отслеживания. Введите его на сайте в любой момент, чтобы узнать статус доставки.'
    }
  ]
  return (
    <div className="faq-page">
      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-top">
            <div className="faq-top-left">
              <h2>Ответы на вопросы</h2>
              <p>Всё, что нужно знать о доставке с Paletkin, в одном месте</p>
            </div>
            <div className="faq-top-right">
              <div className="faq-top-items">
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
          <div className="faq-grid ">
            <div className="faq-intro">
              <h2>Общие вопросы</h2>
              <p>Всё, что нужно знать о доставке с Paletkin, в одном месте</p>

            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}>
                  <button
                    className={`faq-question ${expandedFaq === index ? 'open' : ''}`}
                    onClick={() => setExpandedFaq(expandedFaq === index ? -1 : index)}
                    aria-expanded={expandedFaq === index}
                  > 
                    <span className={`faq-icon ${expandedFaq === index ? 'open' : ''}`} aria-hidden>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>

                    <div className="faq-content">
                      <span className="faq-title">{faq.question}</span>
                      <div className={`faq-answer ${expandedFaq === index ? 'open' : ''}`} role="region">
                        <div className="faq-answer-inner">
                          {faq.answer}
                        </div>
                      </div>
                    </div>

                  </button>

                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      

    </div>
  )
}

export default FAQ
