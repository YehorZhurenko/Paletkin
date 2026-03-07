import './Services.css'

import DocumentsCtaSection from '../components/DocumentsCtaSection'
import CalculatorComponent from '../components/Calculator'
import FaqSection from '../components/FaqSection'
import ServiceSection from '../components/ServicesComponent'
import TopDesc from '../components/TopDesc'
import Breadcrumbs from '../components/Breadcrumbs'


import companys from '../assets/image/partners/companys.svg'


function Services() {


  return (
    <div className="page">
      <div className="page__breadcrumbs">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Услуги' }]} />
        </div>
      </div>
      <div className="page__content">
    <div className="services-page">
      <div className="container">
        <div className="services-container">
          <div className="services-top">
            <TopDesc
              title="Все услуги"
              body="Paletkin предоставляет комплексные услуги грузоперевозок, адаптированные под потребности маркетплейсов и B2B-партнёров. От срочной доставки до профессионального сопровождения грузов — мы обеспечиваем надёжность на каждом этапе."
            />
          </div>

          <div className="service-offer">
            Мы предлагаем <span>комплексные логистические решения</span><br/> для эффективного управления цепочками поставок и доставки товаров
            <br/> на <span>ведущие маркетплейсы России</span>
            <img src={companys} alt="Партнеры" />
          </div>

          <ServiceSection show_top="true" sectionStyle={{ padding: '48px', background: '#f5f5f5', borderRadius: '8px' }} />

          <CalculatorComponent />
          <FaqSection
            title="Ответы на вопросы"
            subtitle="Если вы все еще имеете вопросы о документах и сервисах"
            linkTo="/faq"
            linkText="Перейти в раздел FAQ"
          />
          <DocumentsCtaSection />
        </div>  
      </div>
    </div>
      </div>
    </div>
  )
}

export default Services
