import { useCallback, useEffect, useRef, useState } from 'react'
import './Marketplace.css'
import loader from '../assets/image/delivery/loader.png'
import wbIcon from '../assets/image/icons/mp/wb.svg'
import ozonIcon from '../assets/image/icons/mp/ozon.svg'
import yamIcon from '../assets/image/icons/mp/yam.svg'
import oneIcon from '../assets/image/icons/numbers/one.svg'
import twoIcon from '../assets/image/icons/numbers/two.svg'
import threeIcon from '../assets/image/icons/numbers/four.svg'
import fulfillmentFlIcon from '../assets/image/icons/fulfilm/fl.svg'
import fulfillmentShipIcon from '../assets/image/icons/fulfilm/shipmnt.svg'
import fulfillmentLogiIcon from '../assets/image/icons/fulfilm/logi.svg'
import fulfillmentProcesIcon from '../assets/image/icons/fulfilm/proces.svg'
import cardboardMaterial from '../assets/image/materials/cardboard.svg'
import filmMaterial from '../assets/image/materials/film.svg'
import bubbleMaterial from '../assets/image/materials/bubblefiml.svg'
import scotchMaterial from '../assets/image/materials/scotch.svg'
import casesIllustration from '../assets/image/illustration.png'
import documentsIllustration from '../assets/image/document-illustration.png'
import amerPallet from '../assets/image/pallet/amer-pallet-fz.svg'
import evroPallet from '../assets/image/pallet/evro-pallet-fz.svg'
import finPallet from '../assets/image/pallet/fin-pallet-fz.svg'
import DeliverySection from '../components/DeliverySection'
import CalculatorComponent from '../components/Calculator'
import TariffSection from '../components/TariffsSection'
import VideoSection from '../components/VideoSection'
import FaqSection from '../components/FaqSection'
import OfferSection from '../components/OfferSection'
import SliderBase from '../components/SliderBase'
import TopDesc from '../components/TopDesc'

function Marketplace() {
  const marketplaceWarehouses = [
    {
      id: 'wb',
      name: 'Wildberries',
      count: 11,
      icon: wbIcon,
      warehouses: ['Белые Столбы', 'Внуково', 'Казань', 'Коледино', 'Краснодар', 'Невинномысск', 'Обухово', 'Подольск', 'Рязань', 'Тула', 'Электросталь']
    },
    {
      id: 'ozon',
      name: 'Ozon',
      count: 7,
      icon: ozonIcon,
      warehouses: ['Гривно', 'Жуковский', 'Обухово', 'Пушкино', 'Саларьево', 'Софьино', 'Строгино']
    },
    {
      id: 'ym',
      name: 'Я.Маркет',
      count: 1,
      icon: yamIcon,
      warehouses: ['Софьино']
    }
  ]

  const clientFocusItems = [
    { id: 1, icon: oneIcon, title: 'Круглосуточная служба поддержки' },
    { id: 2, icon: twoIcon, title: 'Прозрачная система отчетности' },
    { id: 3, icon: threeIcon, title: 'Индивидуальный менеджер' }
  ]

  const fulfillmentCards = [
    {
      icon: fulfillmentFlIcon,
      title: 'Передача товаров на ответственное хранение',
      description: 'Доставка товаров на склады фулфилмент-операторов'
    },
    {
      icon: fulfillmentShipIcon,
      title: 'Отгрузка заказов',
      description: 'Забор товаров со складов фулфилмент-операторов для дальнейшей доставки клиентам'
    },
    {
      icon: fulfillmentLogiIcon,
      title: 'Межскладская логистика',
      description: 'Перемещение товаров между фулфилмент-центрами'
    }
  ]

  const workSchemeSteps = [
    {
      icon: fulfillmentProcesIcon,
      title: 'Товары на складе',
      description: 'Paletkin принимает товары от продавца на своем складе.'
    },
    {
      icon: fulfillmentProcesIcon,
      title: 'Обработка',
      description: 'Заказы из маркетплейсов автоматически погружаются в телеграм бота.'
    },
    {
      icon: fulfillmentProcesIcon,
      title: 'Перемещение',
      description: 'Paletkin готовит к отправке и доставляет товары на склады, РЦ и ПВЗ маркетплейсов.'
    },
    {
      icon: fulfillmentProcesIcon,
      title: 'Доставка',
      description: 'Маркетплейс хранит товары и через 1 день доставляет заказ до конечного покупателя.'
    }
  ]

  const packagingItems = [
    {
      image: cardboardMaterial,
      title: 'Коробка картонная',
      description: 'В коробках удобно перевозить любые вещи — от книг до посуды.'
    },
    {
      image: filmMaterial,
      title: 'Стретч-пленка',
      description: 'Пленка защищает вещи во время перевозки от пыли, грязи и потертостей.'
    },
    {
      image: bubbleMaterial,
      title: 'Трехслойная воздушно-пузырчатая пленка',
      description: 'Пузырчатая пленка помогает защитить вещи от ударов, влаги и пыли.'
    },
    {
      image: scotchMaterial,
      title: 'Скотч',
      description: 'Особо прочная клейкая лента на п/э основе.'
    }
  ]

  const palletItems = [
    {
      image: amerPallet,
      title: 'Американские паллеты',
      description: 'Стандарт для автоперевозок, узкие, удобные для фур.'
    },
    {
      image: evroPallet,
      title: 'Европейские паллеты',
      description: 'Широкие, прочные, выдерживают повышенную нагрузку.'
    },
    {
      image: finPallet,
      title: 'Финские паллеты',
      description: 'Квадратные, самые вместительные, идеальны для контейнерных перевозок.'
    }
  ]

  const ctaCards = [
    {
      title: 'Смотреть наши кейсы',
      buttonLabel: 'Смотреть наши кейсы',
      image: casesIllustration
    },
    {
      title: 'Смотреть наши документы',
      buttonLabel: 'Смотреть наши документы',
      image: documentsIllustration
    }
  ]

  const relatedServiceSlides = [
    {
      title: 'Складские услуги',
      description: 'Ответственное хранение, обработка и подготовка грузов с использованием современных систем учета.',
      buttonLabel: 'Узнать подробнее',
      isPopular: true,
      icon: fulfillmentFlIcon
    },
    {
      title: 'Доставка на маркетплейсы',
      description: 'Быстрая и надежная доставка ваших товаров на склады популярных маркетплейсов с учетом всех требований.',
      buttonLabel: 'Изучить',
      isPopular: true,
      icon: fulfillmentShipIcon
    },
    {
      title: 'Фулфилмент',
      description: 'Полный цикл обработки заказов: прием, хранение, упаковка и отправка товаров вашим клиентам.',
      buttonLabel: 'Узнать подробнее',
      isPopular: false,
      icon: fulfillmentLogiIcon
    },
    {
      title: 'Документооборот',
      description: 'Оформление актов, ТТН и сопроводительных документов для безопасной и прозрачной логистики.',
      buttonLabel: 'Узнать подробнее',
      isPopular: false,
      icon: fulfillmentProcesIcon
    },
    {
      title: 'Упаковка и маркировка',
      description: 'Подготовка товара к приемке на маркетплейсах с учетом регламентов и требований площадок.',
      buttonLabel: 'Узнать подробнее',
      isPopular: false,
      icon: scotchMaterial
    }
  ]

  return (
    <div className="marketplace-page">
      <div className="marketplace-top">
        <div className="container">
          <div className="marketplace-top-body">
            <TopDesc
              title="Оперативная доставка грузов на склады маркетплейсов"
              body="Берем на себя всю логистику до маркетплейсов: от забора груза с вашего склада до сдачи в пункт приёма. Контролируем правильность оформления документов и соблюдение графиков поставки. Ваша задача — продавать, наша — доставить груз вовремя и без штрафов."
            />
          </div>
        </div>        
      </div>

      <div className="regular-supplies">
        <div className="container">
          <div className="regular-supplies__header">
            <h2>Регулярные поставки</h2>
            <p>Мы осуществляем регулярные поставки на все основные маркетплейсы России</p>
          </div>

          <div className="regular-supplies__content">
            <div className="regular-supplies__image">
              <img src={loader} alt="Погрузка поставок" />
            </div>

            <div className="regular-supplies__markets">
              {marketplaceWarehouses.map((marketplace) => (
                <div className="regular-supplies__market-item" key={marketplace.id}>
                  <div className="regular-supplies__market-header">
                    <img src={marketplace.icon} alt={marketplace.name} className="regular-supplies__market-icon" />
                    <span className="regular-supplies__market-name">{marketplace.name}</span>
                    <span className="regular-supplies__market-dot">·</span>
                    <span className="regular-supplies__market-count">{marketplace.count}</span>
                  </div>

                  <ul className="regular-supplies__tags">
                    {marketplace.warehouses.map((warehouse) => (
                      <li key={warehouse} className="regular-supplies__tag">
                        {warehouse}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="marketplace-delivery">
        <DeliverySection
          title="Доставка на склады"
          subtitle="Работаем с Wildberries, Ozon, Яндекс.Маркет, Lamoda и другими площадками."
          text_align="flex-start"
        />
      </div>

      <div className="marketplace-sections">
        <div className="container">
          <section className="focus-clients">
            <div className="focus-clients__top">
              <h2>Наш фокус - клиенты</h2>
              <p>
                Мы стремимся обеспечить индивидуальный подход к каждому клиенту.
                Вы получаете гарантированное сопровождение вашего проекта 24/7
                сотрудниками нашей команды.
              </p>
            </div>

            <div className="focus-clients__items">
              {clientFocusItems.map((item) => (
                <article className="focus-clients__item" key={item.id}>
                  <img src={item.icon} alt={`Пункт ${item.id}`} className="focus-clients__badge" />
                  <h3>{item.title}</h3>
                </article>
              ))}
            </div>
          </section>

          <section className="marketplace-card-block">
            <div className="marketplace-card-block__header">
              <h2>Фулфилмент услуги</h2>
              <p>Полный комплекс услуг для работы с фулфилмент-центрами и маркетплейсами</p>
            </div>
            <div className="marketplace-card-grid">
              {fulfillmentCards.map((card) => (
                <article className="marketplace-info-card" key={card.title}>
                  <img src={card.icon} alt="" className="marketplace-info-card__icon" />
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="marketplace-schemes-block">
            <div className="schemes-block__header">
              <h2>Наши схемы работы</h2>
              <div className="scheme-tabs">
                <span className="scheme-tabs__item scheme-tabs__item--active">FBS</span>
                <span className="scheme-tabs__item">FBO</span>
                <span className="scheme-tabs__item">rFBS/DBS</span>
              </div>
            </div>

            <div className="scheme-grid">
              {workSchemeSteps.map((step) => (
                <div className="scheme-step" key={step.title}>
                  <img src={step.icon} alt="" className="marketplace-info-card__icon" />
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <span className="scheme-step__point" />
                </div>
              ))}
            </div>
          </section>

          <section className="packaging-block general-block">
            <div className="packaging-block-card-block__header general-block-header">
              <h2>Упаковочные материалы</h2>
            </div>
            <div className="packaging-block-body general-block-body">
              {packagingItems.map((item) => (
                <article className="packaging-block-card general-block-card" key={item.title}>
                  <img src={item.image} alt={item.title} />
                  <span>{item.title}</span>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="storage-block general-block">
            <div className="storage-block-card-block__header general-block-header">
              <h2>Хранение товара во время перевозки</h2>
            </div>
            <div className="storage-block-body general-block-body ">
              {palletItems.map((item) => (
                <article className="storage-block-card general-block-card" key={item.title}>
                  <img src={item.image} alt={item.title} />
                  <span>{item.title}</span>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="marketplace-calculator">
        <div className="container">
          <CalculatorComponent />
        </div>
      </div>

      <section className="marketplace-double-cta">
        <div className="container">
          <div className="marketplace-double-cta__grid">
            {ctaCards.map((card) => (
              <article
                key={card.title}
                className="marketplace-double-cta__card"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <h3>{card.title}</h3>
                <button type="button">{card.buttonLabel}</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketplace-related-services">
        <div className="container">
          <SliderBase items={relatedServiceSlides}>
            {({ step, maxStep, goTo, sliderRef, trackRef, offset, swipeHandlers }) => (
              <>
                <div className="marketplace-related-services__top">
                  <h2>Сопутствующие услуги</h2>
                  <div className="marketplace-related-services__buttons">
                    <button
                      type="button"
                      className="slider-btn prev"
                      onClick={() => goTo(step - 1)}
                      disabled={step === 0}
                    >
                      ❮
                    </button>
                    <button
                      type="button"
                      className="slider-btn next"
                      onClick={() => goTo(step + 1)}
                      disabled={step >= maxStep}
                    >
                      ❯
                    </button>
                  </div>
                </div>

                <div className="marketplace-related-services__slider" ref={sliderRef}>
                  <div
                    className="marketplace-related-services__track"
                    ref={trackRef}
                    style={{ transform: `translateX(-${offset}px)` }}
                    {...swipeHandlers}
                  >
                    {relatedServiceSlides.map((item) => (
                      <article key={item.title} className="marketplace-related-services__card">
                        {item.isPopular && (
                          <span className="marketplace-related-services__popular">Популярное</span>
                        )}
                        <img
                          src={item.icon}
                          alt={item.title}
                          className="marketplace-related-services__icon"
                        />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <button type="button">{item.buttonLabel}</button>
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
                  className="marketplace-related-services__range"
                />

                <button type="button" className="marketplace-related-services__all-btn">
                  Смотреть все услуги
                </button>
              </>
            )}
          </SliderBase>
        </div>
      </section>

      <div className="marketplace-tariff">
        <div className="container">
          <TariffSection />
        </div>
      </div>

      <div className="marketplace-video">
        <div className="container">
          <VideoSection title="Как мы доставляем грузы на маркетплейсы?" />
        </div>
      </div>

      <div className="marketplace-faq">
        <div className="container">
          <FaqSection
            title="Ответы на вопросы"
            subtitle="Если вы все еще имеете вопросы о документах и сервисах"
            linkTo="/faq"
            linkText="Перейти в раздел FAQ"
          />
        </div>
        <OfferSection title="Начните доставку на маркетплейсы" />
      </div>
    </div>
  )
}

export default Marketplace
