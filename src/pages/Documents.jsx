import React, { useState } from 'react'
import './Documents.css'
import FaqSection from '../components/FaqSection'
import DocumentsCtaSection from '../components/DocumentsCtaSection'
import TopDesc from '../components/TopDesc'
import Breadcrumbs from '../components/Breadcrumbs'

const Documents = () => {
  const [activeTab, setActiveTab] = useState('all')

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


  const filteredDocs = documents.filter(doc => 
    activeTab === 'all' || doc.category === activeTab
  )

  return (
    <div className="page">
      <div className="page__breadcrumbs">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Документы' }]} />
        </div>
      </div>
      <div className="page__content">
    <div className="documents-page">
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <TopDesc
              title="Документы"
              body="Вся необходимая документация для оформления сотрудничества и ведения отчетности."
            />
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
      
      <section className="faq-documents">
        <div className="container">
            <FaqSection
              title="Ответы на вопросы"
              subtitle="Если вы все еще имеете вопросы о документах и сервисах"
              linkTo="/faq"
              linkText="Перейти в раздел FAQ"
            />
        </div>
      </section>
      <DocumentsCtaSection />
    </div>
      </div>
    </div>
  )
}

export default Documents
