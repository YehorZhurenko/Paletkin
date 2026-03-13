import './ServicesComponent.css'

import del from '../assets/image/services/del.png'
import docs from '../assets/image/services/docs.png'
import back from '../assets/image/services/back.png'
import wh from '../assets/image/services/wh.png'
import logi from '../assets/image/services/logi.png'
import fl from '../assets/image/services/fl.png'

function ServiceSection ({
  title = "Все наши услуги",
  subtitle = "",
  show_top = false,
  /** Доп. класс для обёртки — задайте на странице паддинги и фон через свой CSS (например .service-section--home) */
  wrapperClassName = "",
  /** Инлайн-стили для .service-all-body: { padding: '32px 24px', background: '#f5f5f5' } — для простой настройки без отдельного CSS */
  sectionStyle,
}) {
  const rootClassName = ["service-all", wrapperClassName].filter(Boolean).join(" ");
  return (
        <div className={rootClassName}>
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <div className="service-all-body" style={sectionStyle}>
                {show_top && (
                <div className="service-body-top">
                <button className='active'>
                    Все услуги
                </button>
                <button>
                    Доставка на маркетплейсы
                </button>
                <button>
                    Транспортные услуги
                </button>
                <button>
                    Складские услуги
                </button>
                <button>
                    Доп. услуги
                </button>
                </div>
                )}
                <div className="service-body">
                    <div className="service-body-item">
                        <img src={wh} alt="Fl" />
                        <div className="service-item-text ">
                        <h3>Складские услуги</h3>
                        <p>Ответственное хранение, обработка и подготовка грузов с использованием современных систем учета.</p>
                        </div>
                        {/*<button>Узнать подробнее</button> */}
                    </div>
                    <div className="service-body-item">
                        <img src={del} alt="Fl" />
                        <div className="service-item-text ">
                        <h3>Доставка на маркетплейсы</h3>
                        <p>Быстрая и надежная доставка ваших товаров на склады популярных маркетплейсов с учетом всех требований.</p>
                        </div>
                        {/*<button>Узнать подробнее</button> */}
                    </div> 
                    <div className="service-body-item">
                        <img src={fl} alt="Fl" />
                        <div className="service-item-text ">
                        <h3>Фулфилмент</h3>
                        <p>Полный цикл обработки заказов: прием, хранение, упаковка и отправка товаров вашим клиентам.</p>
                        </div>
                        {/*<button>Узнать подробнее</button> */}
                    </div>

                    <div className="service-body-item">
                        <img src={docs} alt="Fl" />
                        <div className="service-item-text ">
                        <h3>Документооборот</h3>
                        <p>Официальные бланки, договоры и доверенности для организации перевозок. Полный набор необходимых документов.</p>
                        </div>
                        {/*<button>Узнать подробнее</button> */}
                    </div>
                    <div className="service-body-item">
                        <img src={logi} alt="Fl" />
                        <div className="service-item-text ">
                        <h3>Логистический аутсорсинг</h3>
                        <p>Комплексное управление логистическими процессами вашего бизнеса с оптимизацией расходов.</p>
                        </div>
                        {/*<button>Узнать подробнее</button> */}
                    </div> 
                    <div className="service-body-item">
                        <img src={fl} alt="Fl" />
                        <div className="service-item-text ">
                        <h3>Возвраты товаров</h3>
                        <p>Организация процесса возврата товаров с маркетплейсов и от конечных потребителей на ваш склад.</p>
                        </div>
                        {/*<button>Узнать подробнее</button> */}
                    </div>   
                </div>
            </div>
        </div>
    )
}

export default ServiceSection
