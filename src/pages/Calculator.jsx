import './Calculator.css'

import CalculatorComponent from '../components/Calculator'
import OfferSection from '../components/OfferSection'
import WhyUsSection from '../components/WhyUs'
import Breadcrumbs from '../components/Breadcrumbs'


function Calculator() {
  return (
    <div className="page">
      <div className="page__breadcrumbs">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Калькулятор' }]} />
        </div>
      </div>
      <div className="page__content">
    <div className="calculator-page">
      <div className="container">
        <CalculatorComponent />
          <WhyUsSection />
      </div>
      <OfferSection title="Готовы отправить груз?" />
    </div>
      </div>
    </div>
  )
}

export default Calculator
