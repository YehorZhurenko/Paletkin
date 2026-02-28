import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Documents.css'

const Documents = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [expandedFaq, setExpandedFaq] = useState(0)

  const tabs = [
    { id: 'all', label: 'Все документы' },
    { id: 'recommended', label: 'Реквизиты компании' },
    { id: 'forms', label: 'Формы и бланки' },
    { id: 'contracts', label: 'Договоры' },
    { id: 'dogorennsiti', label: 'Договоренности' },

  ]

  const documents = [
    {
      id: 1,
      title: 'Наши Реквизиты',
      description: 'Этот документ содержит основные реквизиты нашей компании. Он необходим для заключения договоров и ведения с нами деловых отношений.',
 
      category: 'all'
    },
    {
      id: 2,
      title: 'Форма накладной',
      description: 'Данная форма покупателя для составления товарно-транспортного документа. Описание каждого документа приложение к документам.',
    
      category: 'all'
    },
    {
      id: 3,
      title: 'Шаблон договора транспортного экспедирования',
      description: 'Типовой договор на транспортные услуги, составленный в соответствии с действующим законодательством. Готовый бланк, который легко адаптировать под ваши условия.',
  
      category: 'all'
    },
    {
      id: 4,
      title: 'Договор-заявка',
      description: 'Универсальный документ, объединяющий заявку и договор. Позволяет быстро оформить заказ с учетом особенностей груза.',

      category: 'all'
    },
    {
      id: 5,
      title: 'Доверенности',
      description: 'Этот раздел содержит различные виды доверенностей, необходимые для осуществления транспортно-логистических операций.',
      category: 'all'
    }
  ]

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

  const filteredDocs = documents.filter(doc => 
    activeTab === 'all' || doc.category === activeTab
  )

  return (
    <div className="documents-page">


      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <h1>Документы</h1>
            <span>Вся необходимая документация для оформления сотрудничества <br/>и ведения отчетности.</span>
          </div>
        </div>
      </section>

      <section className="documents-section">
        <div className="container">
          <h1>Все наши документы</h1>
          <div className="documents-container">
              {/* Tabs Navigation */}
              
              <div className="docs-tabs">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Documents Grid */}
              <div className="docs-grid">
                {filteredDocs.map(doc => (
                  <div key={doc.id} className="doc-card">
                    <h3 className="doc-title">{doc.title}</h3>
                    <p className="doc-desc">{doc.description}</p>
                    <button className="download-btn">
                      Скачать документ
                    </button>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-grid">
            <div className="faq-intro">
              <h2>Ответы на вопросы</h2>
              <p>Если вы все еще имеете вопросы о документах и сервисах</p>
              <Link to="/faq" className="learn-more-btn">
                Перейти в раздел FAQ
              </Link>
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

      {/* Bottom CTA Sections */}
      <section className="bottom-ctas">
        <div className="container">
          <div className="cta-grid">
            <div className="cta-card left-card">
              <h3>Нужны другие документы?</h3>
              <p>Если вам требуются дополнительные документы или у вас есть вопросы, свяжитесь с нашими специалистами</p>
              <a href="mailto:logistic@paletkin.pro" className="email-link">
                logistic@paletkin.pro →
              </a>
            </div>

            <div className="cta-card right-card">
              <h3>Готовы отправить груз?</h3>
              <p>Две минуты на оформление, остальное за нами. Доставим день в день</p>
              <form className="cta-form">
                <input 
                  type="tel" 
                  placeholder="Ваш номер телефона" 
                  className="cta-input"
                  required
                />
                <button type="submit" className="order-cta-btn">
                  Оставить заявку
                </button>
              </form>
              <span className="cta-notice">Нажимая кнопку, вы согласаетесь с нашей политикой конфиденциальности</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Documents
