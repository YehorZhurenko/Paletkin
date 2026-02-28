import './About.css'

import { useState, useRef, useEffect } from 'react';
import logo from '../assets/image/logo/orange-logo.svg';
import patner from '../assets/image/icons/partner.svg';
import delivery from '../assets/image/delivery.png';

import gear from '../assets/image/different/gear.png';
import van from '../assets/image/different/van.png';
import box from '../assets/image/different/box.png';
import folder from '../assets/image/different/folder.png';

import item_car1 from '../assets/image/cars/item-car.png';
import item_car2 from '../assets/image/cars/item-car2.png';
import item_car3 from '../assets/image/cars/item-car3.png';
import item_car4 from '../assets/image/cars/item-car4.png';
import item_car5 from '../assets/image/cars/item-car5.png';
import venicle from '../assets/image/cars/vehicle-image-container.png';

import specialist1 from '../assets/image/specialist/specialist-card.png';
import specialist2 from '../assets/image/specialist/specialist-card2.png';
import specialist3 from '../assets/image/specialist/specialist-card3.png';
import specialist4 from '../assets/image/specialist/specialist-card4.png';
import specialist5 from '../assets/image/specialist/specialist-card5.png';
import specialist6 from '../assets/image/specialist/specialist-card6.png';
import specialist7 from '../assets/image/specialist/specialist-card7.png';

import lamoda from '../assets/image/partners/lamoda.svg';
import megam from '../assets/image/partners/megam.svg';
import ozon from '../assets/image/partners/ozon.svg';
import paletkin from '../assets/image/partners/paletkin.svg';
import sdek from '../assets/image/partners/sdek.svg';

import avatar1 from '../assets/image/avatars/avatar1.png';
import avatar2 from '../assets/image/avatars/avatar2.png';
import avatar3 from '../assets/image/avatars/avatar3.png';



function About() {
  const slides = [
    {
      img: gear,
      title: 'Доставка день в день',
      text: 'Экспресс доставка грузов по Москве и Московской области в день заказа',
    },
    {
      img: van,
      title: 'Легальность и штат',
      text: 'Работа исключительно с лицензированными перевозчиками и нанятыми водителями',
    },
    {
      img: box,
      title: 'Собственный автопарк',
      text: 'Более 200 машин на балансе компании позволяют гарантировать сроки',
    },
    {
      img: folder,
      title: 'Технология',
      text: 'Собственная система отслеживания и управления логистикой в реальном времени',
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      logo: sdek,
      avatar: avatar1,
      company: 'СДЭК',
      title: 'Доставка день в день',
      text: '«День в день — это не миф. Заказал утром, груз уже в Москве вечером. Честные люди, честные цены.»',
      author: 'Иван Петров',
      role: 'Логист, СДЭК',
    },
    {
      logo: lamoda,
      avatar: avatar2,
      company: 'Lamoda',
      title: 'Экспресс-доставка',
      text: '«С Paletkin ни разу не забыли о задержках! Всегда вовремя, всегда чётко. Рекомендую всем, кто ценит своё время.»',
      author: 'Артур Кузнецов',
      role: 'Владелец магазина, Lamoda',
    },
    {
      logo: ozon,
      avatar: avatar3,
      company: 'OZON',
      title: 'Моментальная доставка',
      text: '«Благодаря Paletkin, наши товары доставляются клиентам быстрее и удобнее — это экономит наше время и деньги.»',
      author: 'Светлана Орлова',
      role: 'Менеджер, Ozon',
    },
  ];

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((idx) => (idx > 0 ? idx - 1 : idx));
  };

  const nextSlide = () => {
    setCurrentIndex((idx) => (idx < slides.length - 1 ? idx + 1 : idx));
  };

  const onRangeChange = (e) => {
    setCurrentIndex(Number(e.target.value));
  };

   const onRangeChange2 = (e) => {
    setCurrentIndex(Number(e.target.value));
  };

  const prevReview = () => {
    setCurrentReviewIndex((idx) => (idx > 0 ? idx - 1 : idx));
  };

  const nextReview = () => {
    setCurrentReviewIndex((idx) =>
      idx < reviews.length - 1 ? idx + 1 : idx
    );
  };

  const carTitle1 = 'Газель 3м';
  const carTitle2 = 'Для маркетплейсов самое то!';

  const steps = [
    { num: '01', title: 'Оставьте заявку', text: 'Заполните форму на сайте или позвоните нам. Менеджер уточнит детали груза, маршрут и рассчитает точную стоимость перевозки.' },
    { num: '02', title: 'Заключите договор', text: 'Согласуем условия и подпишем договор-заявку. Мы зафиксируем цену, сроки и ответственность, чтобы вы были уверены в надёжности.' },
    { num: '03', title: 'Получите услугу', text: 'Мы заберём груз, оформим документы и доставим его получателю. Вы сможете отслеживать статус перевозки на каждом этапе.' },
    { num: '04', title: 'Оплатите услуги', text: 'После выполнения работы мы предоставим полный пакет закрывающих документов. Оплата производится согласно условиям договора.' },
  ];

  const stepsSectionRef = useRef(null);
  const [visibleSteps, setVisibleSteps] = useState({});

  useEffect(() => {
    const section = stepsSectionRef.current;
    if (!section) return;
    const items = section.querySelectorAll('.steps-item');
    const observers = Array.from(items).map((el, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisibleSteps((prev) => ({ ...prev, [i]: true }));
        },
        { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const partnerLogos = [ozon, lamoda, megam, paletkin, sdek];

  const specialists = [
    { img: specialist1, name: 'Алексей Волков', job: 'Руководитель отдела продаж' },
    { img: specialist2, name: 'Макар Сергеев', job: 'Ведущий логист' },
    { img: specialist3, name: 'Екатерина Белова', job: 'Финансовый директор' },
    { img: specialist4, name: 'Артем Морозов', job: 'Менеджер по развитию' },
    { img: specialist5, name: 'Давид Смирнов', job: 'HR-менеджер' },
    { img: specialist6, name: 'Ольга Яковлева', job: 'Технический директор' },
    { img: specialist7, name: 'Игорь Петров', job: 'Юрист' },
  ];

  return (
    <div className="about-page">
      
      <section className="intro-section">
        <div className="container">
          <div className="intro-content">
            <h1>О компании</h1>
            <p>
              Мы специализируемся на грузоперевозках для B2B-сегмента и поставщиков маркетплейсов. Наш приоритет — комплексный подход: от экспресс-доставки до полного экспедирования грузов. Мы знаем требования торговых площадок и понимаем ценность времени в бизнесе, поэтому гарантируем надежность и контроль на каждом этапе пути.
            </p>
          </div>
        </div>
      </section>

      <section className="partner">
        <div className="container">
          <div className="partner-content">
            <div className="partner-text">
              <p className="partner-title">
                Надёжный партнёр <br/> по транспортной и логистической доставке для <span className="highlight">B2B и маркетплейсов <br/> в России и СНГ</span>
                <img src={patner} alt="Partner Icon" />
              </p>
            </div>
            <div className="partner-image">
              <img src={logo} alt="Paletkin Logo" />
            </div>
          </div>
        </div>
      </section>

      <section className='statistic'>
        <div className="container">
          <div className="statistic-content">
            <div className="statistic-item">
              <div className="statistic-title">Доставок в месяц</div>
              <span className="statistic-count">15000+</span>
            </div>

            <div className="statistic-item">
              <div className="statistic-title">Городов России</div>
              <div className="statistic-count">50+</div>
            </div>

            <div className="statistic-item">
              <div className="statistic-title">Машин в автопарке</div>
              <div className="statistic-count">200+</div>
            </div>

            <div className="statistic-item">
              <div className="statistic-title">Среднее время доставки</div>
              <div className="statistic-count">4ч</div>
            </div>
          </div>
        </div>
      </section>

      <section className="delivery">
        <div className="container">
          <div className="delivery-content">
        
            <div className="delivery-title">
              Честность, скорость <br/>и технология в каждой доставке
            </div>

            <div className="delivery-idea">
              <p>
                Paletkin родилась из простой идеи — доставлять грузы так, как обещаешь. Без отговорок, без задержек, без лишних слов. Мы начали с одного автомобиля и верой в то, что клиент заслуживает честного отношения.
              </p>
              <div className="delivery-list">
                <span>
                  То, что вызывает уважение при работе с нами:
                </span>
                <ul>
                  <li>Скорость</li>
                  <li>Доставка день в день</li>
                  <li>Личные менеджеры, готовые помочь</li>
                </ul>
              </div>
            </div>
            
            <div className="delivery-body">
              <img src={delivery} alt="Delivery" />
              <button className="delivery-button">Скачать презентацию компании</button>
            </div>
          </div>
        </div>
      </section>

      <section className="different">
        <div className="container">
          <div className="different-content">
            <div className="different-top">
              <h2 className="different-title">Что отличает нас</h2>
              <div className="different-buttons">
                <button onClick={prevSlide} className="slider-btn prev">❮</button>
                <button onClick={nextSlide} className="slider-btn next">❯</button>
              </div>
            </div>
            <div className="different-slider">
              <div
                className="slider-track"
                style={{ transform: `translateX(-${currentIndex * 600}px)` }}
              >
                {slides.map((slide, idx) => (
                  <div key={idx} className="feature-card">
                    <img src={slide.img} alt={slide.title} className="card-image" />
                    <h3>{slide.title}</h3>
                    <p>{slide.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <input
              type="range"
              min="0"
              max={slides.length - 1}
              value={currentIndex}
              onChange={onRangeChange}
              className="slider-range"
            />
          </div>
        </div>
      </section>

      <section className="cars">
        <div className="container">
          <div className="cars-content">
            <div className="cars-text">
              <h2>Наши автопарк</h2>
              <p>Собственный автопарк транспортной компании &laquo;МарсТрансАвто&raquo; насчитывает 87 единиц современной техники, которой управляют наши опытные водители. Мы предложим вам наиболее подходящий автомобиль с учётом всех характеристик вашего груза и маршрута.</p>
            </div>
            <div className="cars-body">
              <div className="cars-left">

                <div className="cars-title">
                  <span>{carTitle1}</span>
                  <span>{carTitle2}</span>
                </div>

                <div className="cars-main">
                <img src={venicle} alt="Venicle" />
                </div>
                <div className="cars-main-text">
                  <div className="car-descr">
                    Собственный автопарк транспортной компании &laquo;МарсТрансАвто&raquo; насчитывает 87 единиц современной техники, которой управляют наши опытные водители. Мы предложим вам наиболее подходящий автомобиль с учётом всех характеристик вашего груза и маршрута.

                  </div>
                  <div className="car-spec">
                    <div className="car-spec-item">
                      <p>Объем кузова</p>
                      <p>до 3 м3</p>
                    </div>
                    <div className="car-spec-item">
                      <p>Паллеты</p>
                      <p>6-8 европаллет</p>
                    </div>
                    <div className="car-spec-item">
                      <p>Габариты кузова (д. {'\u00D7'} шир. {'\u00D7'} выс.)</p>
                      <p>до 1,5 {'\u00D7'} 1,3 {'\u00D7'} 1 м</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="cars-rigth">
                <div
                  className="cars-item"
                  style={{ backgroundImage: `url(${item_car1})` }}
                >
                  <div className="cars-weight">1,5т</div>
                  <div className="cars-name">Газель 3 м</div>
                  <div className="cars-price">от 2500₽</div>
                </div>
                <div
                  className="cars-item"
                  style={{ backgroundImage: `url(${item_car2})` }}
                >
                  <div className="cars-weight">1,5т</div>
                  <div className="cars-name">Газель 3 м</div>
                  <div className="cars-price">от 2500₽</div>
                </div>
                <div
                  className="cars-item"
                  style={{ backgroundImage: `url(${item_car3})` }}
                >
                  <div className="cars-weight">1,5т</div>
                  <div className="cars-name">Газель 3 м</div>
                  <div className="cars-price">от 2500₽</div>
                </div>
                <div
                  className="cars-item"
                  style={{ backgroundImage: `url(${item_car4})` }}
                >
                  <div className="cars-weight">1,5т</div>
                  <div className="cars-name">Газель 3 м</div>
                  <div className="cars-price">от 2500₽</div>
                </div>
                <div
                  className="cars-item"
                  style={{ backgroundImage: `url(${item_car5})` }}
                >
                  <div className="cars-weight">1,5т</div>
                  <div className="cars-name">Газель 3 м</div>
                  <div className="cars-price">от 2500₽</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="specialist">
        <div className="container">
          <div className="specialist-content">
            <div className="specialist-header">
              <h2 className="specialist-title">Люди, которые делают Paletkin лучше</h2>
              <p className="specialist-subtitle">Каждый здесь знает, что значит доставить груз честно и вовремя</p>
            </div>
            <div className="specialist-grid">
              {specialists.map((s, i) => (
                <div
                  key={i}
                  className="specialist-item"
                  style={{ backgroundImage: `url(${s.img})` }}
                >
                  <div className="specialist-info">
                    <div className="specialist-name">{s.name}</div>
                    <div className="specialist-job">{s.job}</div>
                  </div>
                </div>
              ))}
              <div className="specialist-item specialist-placeholder">
                <div className="specialist-info specialist-info--center">
                  <div className="specialist-count">100+</div>
                  <div className="specialist-desc">Членов команды работают над Paletkin каждый день</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={stepsSectionRef} className="steps-section">
        <div className="container">
          <div className="steps-content">
            <h2 className={`steps-title ${Object.keys(visibleSteps).length > 0 ? 'steps-title--visible' : ''}`}>Работа с нами проходит в 4 этапа</h2>
            <div className="steps-timeline">
              <div className="steps-line" />
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`steps-item ${visibleSteps[i] ? 'steps-item--visible' : ''}`}
                >
                  <div className="steps-marker-wrap">
                    <div className="steps-marker">
                      <span className="steps-marker-dot" />
                    </div>
                    <span className="steps-number">{step.num}</span>
                  </div>
                  <div className="steps-body">
                    <h3 className="steps-heading">{step.title}</h3>
                    <p className="steps-text">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="partners-section">
        <div className="container">
          <h2 className="partners-title">С нами работают лучшие</h2>
          <div className="partners-band">
            <div className="partners-track">
              {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                <div key={i} className="partners-logo">
                  <img src={logo} alt="" />
                </div>
              ))}

              {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                <div key={i} className="partners-logo">
                  <img src={logo} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="reviews">
        <div className="container">
          <div className="reviews-content">
            <div className="reviews-top">
              <div>
                <h2 className="reviews-title">Отзывы клиентов</h2>
                <p className="reviews-subtitle">Что говорят те, кто уже работает с нами</p>
              </div>
              <div className="reviews-buttons">
                <button onClick={prevReview} className="slider-btn prev">❮</button>
                <button onClick={nextReview} className="slider-btn next">❯</button>
              </div>
            </div>

            <div className="reviews-slider">
              <div
                className="reviews-track"
                style={{ transform: `translateX(-${currentReviewIndex * 640}px)` }}
              >
                {reviews.map((review, idx) => (
                  <article key={idx} className="review-card">
                    <img src={review.logo} alt={review.company} className="review-logo" />
                    <h3 className="review-title">{review.title}</h3>
                    <p className="review-text">{review.text}</p>
                    <div className="review-footer">
                      <div className="review-author">
                        <div className="review-author-avatar">
                          <img src={review.avatar} alt={review.author} />
                        </div>
                        <div className="review-author-info">
                          <div className="review-author-name">{review.author}</div>
                          <div className="review-author-role">{review.role}</div>
                        </div>
                      </div>
                      <button className="review-button">Перейти к кейсу</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <input
              type="range"
              min="0"
              max={slides.length - 1}
              value={currentReviewIndex}
              onChange={onRangeChange2}
              className="reviews-slider-range"
            />
          </div>
        </div>
      </section>
      
      <section className="offer">
          <h3>Начните доставку прямо сейчас</h3>
          <p>Две минуты на оформление, остальное за нами. Доставим день в день</p>
          <form className="offer-form">
            <input 
              type="tel" 
              placeholder="Ваш номер телефона" 
              className="offer-input" requiredName="offer-input"

            />
            <button type="submit" className="order-offer-btn">
              Оставить заявку
            </button>
          </form>
          <span className="offer-notice">Нажимая кнопку, вы согласаетесь с нашей политикой конфиденциальности</span>
      </section>

    </div>
  )
}

export default About
