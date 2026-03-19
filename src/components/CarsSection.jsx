import { useState } from 'react'

import './CarsSection.css'
import venicle from '../assets/image/cars/vehicle-image-container.png'
import item_car1 from '../assets/image/icons/cars/1.png'
import item_car2 from '../assets/image/icons/cars/2.png'
import item_car3 from '../assets/image/icons/cars/3.png'
import item_car4 from '../assets/image/icons/cars/4.png'
import item_car5 from '../assets/image/icons/cars/3.png'
import SliderBase from './SliderBase'

const cars = [
  {
    id: 0,
    title1: 'Газель 3 м',
    title2: 'Для маркетплейсов самое то!',
    image: venicle,
    bg: item_car1,
    weight: '1,5т',
    name: 'Газель 3 м',
    price: 'от 2500₽',
    descr:
      'Собственный автопарк транспортной компании «МарсТрансАвто» насчитывает 87 единиц современной техники, которой управляют наши опытные водители. Мы предложим вам наиболее подходящий автомобиль с учётом всех характеристик вашего груза и маршрута.',
    volume: 'до 3 м3',
    pallets: '6-8 европаллет',
    size: 'до 1,5 × 1,3 × 1 м'
  },
  {
    id: 1,
    title1: 'Газель 1,5 т',
    title2: 'Для маркетплейсов самое то!',
    image: venicle,
    bg: item_car2,
    weight: '1,5т',
    name: 'Газель 1,5 т',
    price: 'от 2500₽',
    descr:
      'Собственный автопарк транспортной компании «Марсyuasdhвто» насчитывает 87 единиц современной техники, которой управляют наши опытные водители. Мы предложим вам наиболее подходящий автомобиль с учётом всех характеристик вашего груза и маршрута.',
    volume: 'до 3 м3',
    pallets: '6-8 европаллет',
    size: 'до 1,5 × 1,3 × 1 м'
  },
  {
    id: 2,
    title1: 'Фургон',
    title2: 'Для маркетплейсов самое то!',
    image: venicle,
    bg: item_car3,
    weight: '1,5т',
    name: 'Фургон',
    price: 'от 2500₽',
    descr:
      'Собственный автопарк транспортной компании «МарсТрансАвто» насчитывает 87 единиц современной техники, которой управляют наши опытные водители. Мы предложим вам наиболее подходящий автомобиль с учётом всех характеристик вашего груза и маршрута.',
    volume: 'до 3 м3',
    pallets: '6-8 европаллет',
    size: 'до 1,5 × 1,3 × 1 м'
  },
  {
    id: 3,
    title1: 'Каблук',
    title2: 'Для маркетплейсов самое то!',
    image: venicle,
    bg: item_car4,
    weight: '1,5т',
    name: 'Каблук',
    price: 'от 2500₽',
    descr:
      'Собственный автопарк транспортной компании «МарсТрансАвто» насчитывает 87 единиц современной техники, которой управляют наши опытные водители. Мы предложим вам наиболее подходящий автомобиль с учётом всех характеристик вашего груза и маршрута.',
    volume: 'до 3 м3',
    pallets: '6-8 европаллет',
    size: 'до 1,5 × 1,3 × 1 м'
  },
  {
    id: 4,
    title1: 'Фура 5т',
    title2: 'Для маркетплейсов самое то!',
    image: venicle,
    bg: item_car1,
    weight: '1,5т',
    name: 'Фура 5т',
    price: 'от 2500₽',
    descr:
      'Собственный автопарк транспортной компании «МарсТрансАвто» насчитывает 87 единиц современной техники, которой управляют наши опытные водители. Мы предложим вам наиболее подходящий автомобиль с учётом всех характеристик вашего груза и маршрута.',
    volume: 'до 3 м3',
    pallets: '6-8 европаллет',
    size: 'до 1,5 × 1,3 × 1 м'
  }
]

function CarsSection() {
  const [selectedId, setSelectedId] = useState(0)
  const selectedCar = cars.find((c) => c.id === selectedId) ?? cars[0]

  return (
    <section className="cars">
      <div className="container">
        <div className="cars-content">
          <div className="cars-text">
            <h2>Наш автопарк</h2>
            <p>
              Собственный автопарк транспортной компании &laquo;МарсТрансАвто&raquo;
              насчитывает 87 единиц современной техники, которой управляют наши опытные
              водители. Мы предложим вам наиболее подходящий автомобиль с учётом всех
              характеристик вашего груза и маршрута.
            </p>
          </div>
          <div className="cars-body">
            {/* Сетка карточек — скрыта при ширине ≤600px через CSS */}
            <div className="cars-view cars-view--grid">
              <div className="cars-left">
                <div className="cars-title">
                  <span>{selectedCar.title1}</span>
                  <span>{selectedCar.title2}</span>
                </div>
                <div className="cars-main">
                  <img src={selectedCar.image} alt={selectedCar.name} />
                </div>
                <div className="cars-main-text">
                  <div className="car-descr">{selectedCar.descr}</div>
                  <div className="car-spec">
                    <div className="car-spec-item">
                      <p>Объем кузова</p>
                      <p>{selectedCar.volume}</p>
                    </div>
                    <div className="car-spec-item">
                      <p>Паллеты</p>
                      <p>{selectedCar.pallets}</p>
                    </div>
                    <div className="car-spec-item">
                      <p>Габариты кузова (д. × шир. × выс.)</p>
                      <p>{selectedCar.size}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cars-rigth">
                {cars.map((car) => (
                  <button
                    key={car.id}
                    type="button"
                    className={`cars-item${car.id === selectedId ? ' cars-item--active' : ''}`}
                    onClick={() => setSelectedId(car.id)}
                  >
                    <div className="cars-pic"><img src={car.bg} alt="car-pic" /></div>
                    <div className="cars-weight">{car.weight}</div>
                    <div className="cars-name">{car.name}</div>
                    <div className="cars-price">{car.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Слайдер — скрыт при ширине >600px через CSS */}
            <div className="cars-view cars-view--slider">
              <SliderBase items={cars}>
                {({ step, sliderRef, trackRef, offset, swipeHandlers }) => {
                  const currentCar = cars[step] ?? cars[0]
                  return (
                    <>
                      <div className="cars-left">
                        <div className="cars-title">
                          <span>{currentCar.title1}</span>
                          <span>{currentCar.title2}</span>
                        </div>
                        <div className="cars-main">
                          <img src={currentCar.image} alt={currentCar.name} />
                        </div>
                        <div className="cars-main-text">
                          <div className="car-descr">{currentCar.descr}</div>
                          <div className="car-spec">
                            <div className="car-spec-item">
                              <p>Объем кузова</p>
                              <p>{currentCar.volume}</p>
                            </div>
                            <div className="car-spec-item">
                              <p>Паллеты</p>
                              <p>{currentCar.pallets}</p>
                            </div>
                            <div className="car-spec-item">
                              <p>Габариты кузова (д. × шир. × выс.)</p>
                              <p>{currentCar.size}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="cars-rigth">
                        <div className="cars-slider" ref={sliderRef}>
                          <div
                            className="cars-slider-track"
                            ref={trackRef}
                            style={{ transform: `translateX(-${offset}px)` }}
                            {...swipeHandlers}
                          >
                            {cars.map((car) => (
                              <div
                                key={car.id}
                                className="cars-item cars-item--slide"
                               
                              >
                                <div className="cars-pic"><img src={car.bg} alt="car-pic" /></div>
                                <div className="cars-weight">{car.weight}</div>
                                <div className="cars-name">{car.name}</div>
                                <div className="cars-price">{car.price}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }}
              </SliderBase>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarsSection

