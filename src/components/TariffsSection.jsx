import { useState } from 'react'
import './TariffSection.css'

const defaultMarketplaces = [
  {
    id: 'wb',
    name: 'Wildberries',
    active: true,
    warehouseGroups: [
      {
        label: 'Склады 1',
        warehouses: ['Белые Столбы', 'Внуково', 'НевинномыссК', 'Обухово', 'Подольск', 'Рязань', 'Тула', 'Электросталь', 'Казань', 'Краснодар', 'Коледино'],
        tariffs: [
          { quantity: '1 Палет', price: '4200 P' },
          { quantity: '2 Палет', price: '4200 P' },
          { quantity: '3 Палет', price: '4200 P' },
          { quantity: 'От 9 до 10 паллет', price: '4200 P' },
          { quantity: 'От 11 до 15 паллет', price: '4200 P' }
        ]
      },
      {
        label: 'Склады 2',
        warehouses: ['Хабаровск', 'Новосибирск', 'Екатеринбург'],
        tariffs: [
          { quantity: '1 Палет', price: '5800 P' },
          { quantity: '2 Палет', price: '5500 P' },
          { quantity: '3 Палет', price: '5200 P' }
        ]
      }
    ]
  },
  { id: 'ozon', name: 'OZON', warehouseGroups: [{ label: 'Склады 1', warehouses: ['Хоругвино', 'Пушкино', 'Тверь'], tariffs: [{ quantity: '1 Палет', price: '3900 P' }, { quantity: '2 Палет', price: '3700 P' }] }] },
  { id: 'ym', name: 'Я.Маркет', warehouseGroups: [{ label: 'Склады 1', warehouses: ['Софьино', 'Томилино'], tariffs: [{ quantity: '1 Палет', price: '4000 P' }] }] },
  { id: 'lamoda', name: 'Lamoda', warehouseGroups: [{ label: 'Склады 1', warehouses: ['Быково'], tariffs: [{ quantity: '1 Палет', price: '4500 P' }] }] },
  { id: 'dm', name: 'Детский мир', warehouseGroups: [{ label: 'Склады 1', warehouses: ['Котовск'], tariffs: [{ quantity: '1 Палет', price: '4100 P' }] }] },
  { id: 'magnit', name: 'Магнит маркет', warehouseGroups: [{ label: 'Склады 1', warehouses: ['Краснодар'], tariffs: [{ quantity: '1 Палет', price: '3800 P' }] }] },
  { id: 'sber', name: 'СберМегаМаркет', warehouseGroups: [{ label: 'Склады 1', warehouses: ['Софьино'], tariffs: [{ quantity: '1 Палет', price: '4300 P' }] }] }
]

export default function TariffsSection({
  title = 'Тарифы доставки на маркетплейсы',
  subtitle = 'Прозрачные тарифы на доставку до маркетплейсов',
  marketplaces = defaultMarketplaces,
  className = ''
}) {
  const [activeMarketplaceId, setActiveMarketplaceId] = useState(
    marketplaces.find((m) => m.active)?.id ?? marketplaces[0]?.id
  )
  const [activeGroupIndex, setActiveGroupIndex] = useState(0)

  const activeMarketplace = marketplaces.find((m) => m.id === activeMarketplaceId) ?? marketplaces[0]
  const groups = activeMarketplace.warehouseGroups ?? []
  const currentGroup = groups[activeGroupIndex] ?? groups[0]

  const handleMarketplaceChange = (id) => {
    setActiveMarketplaceId(id)
    setActiveGroupIndex(0)
  }

  return (
    <section className={`tariff-section ${className}`}>
        <header className="tariff-section-header">
          <div className="tariff-section-header-left">
            <h2 className="tariff-section-title">{title}</h2>
            <p className="tariff-section-subtitle">{subtitle}</p>
          </div>
          <div className="tariff-section-marketplaces">
            {marketplaces.map((mp) => (
              <button
                key={mp.id}
                type="button"
                className={`tariff-section-marketplace-tag marketplace-tag ${activeMarketplaceId === mp.id ? 'tariff-section-marketplace-tag--active' : ''}`}
                onClick={() => handleMarketplaceChange(mp.id)}
              >
                {mp.name}
              </button>
            ))}
          </div>
        </header>

        <div className="tariff-section-data">
          <div className="tariff-section-warehouses">
            {groups.map((group, i) => (
              <div
                key={i}
                className={`tariff-section-warehouse-block ${activeGroupIndex === i ? 'tariff-section-warehouse-block--active' : ''}`}
                onClick={() => setActiveGroupIndex(i)}
              >
                <h3 className="tariff-section-block-title">{group.label}</h3>
                <ul className="tariff-section-warehouses-tags">
                  {group.warehouses.map((wh, j) => (
                    <li key={j} className="tariff-section-warehouse-tag marketplace-tag">
                      {wh}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="tariff-section-prices-block">
            <div className="tariff-section-prices-header">
              <span className="tariff-section-prices-col-title">Количество паллет</span>
              <span className="tariff-section-prices-col-title">Стоимость</span>
            </div>
            {currentGroup && (
              <ul className="tariff-section-prices-list">
                {currentGroup.tariffs.map((row, i) => (
                  <li key={i} className="tariff-section-price-row">
                    <span className="tariff-section-price-quantity">{row.quantity}</span>
                    <span className="tariff-section-price-pill">
                      <span className='marketplace-tag'>
                        {row.price}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
    </section>
  )
}
