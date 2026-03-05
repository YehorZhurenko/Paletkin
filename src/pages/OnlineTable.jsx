import { useMemo, useState } from 'react'
import './OnlineTable.css'
import '../components/Calculator.css'

import FaqSection from '../components/FaqSection'
import OfferSection from '../components/OfferSection'
import arrowIcon from '../assets/image/icons/arrow.svg'

const popularRoutes = [
  { id: 'all', label: 'Все' },
  { id: 'msk-spb', from: 'Москва', to: 'СПБ' },
  { id: 'msk-kzn', from: 'Москва', to: 'Казань' },
  { id: 'spb-msk', from: 'СПБ', to: 'Москва' },
  { id: 'msk-nn', from: 'Москва', to: 'Нижний-Новгород' },
  { id: 'kzn-nn', from: 'Казань', to: 'Нижний-Новгород' },
  { id: 'msk-sochi', from: 'Москва', to: 'Сочи' },
  { id: 'msk-kaliningrad', from: 'Москва', to: 'Калининград' }
]

const shipmentsMock = [
  {
    id: '2AD30X042',
    routeId: 'msk-spb',
    vehicle: 'Фургон',
    deadline: '01:23:45:59',
    customer: 'ПКК EXPRESS',
    customerType: 'Логист. компания',
    fromCity: 'Москва',
    fromAddress: 'ул. Волжская, 32',
    toCity: 'Казань',
    toAddress: 'пр. Нестерова, 163А',
    fillLevel: '132 м³ / 3,2 паллета / 912 кг',
    dateTime: '2026-09-12T17:00:00',
    status: 'Почти заполнен'
  },
  {
    id: '4KHD9201',
    routeId: 'msk-kzn',
    vehicle: 'Фура 3 т',
    deadline: '15:32:59',
    customer: 'OZON',
    customerType: 'Маркетплейс',
    fromCity: 'Москва',
    fromAddress: 'ул. Петровка, 28',
    toCity: 'Казань',
    toAddress: 'ул. Баумана, 7',
    fillLevel: '110 м³ / 2,8 паллета / 850 кг',
    dateTime: '2026-09-15T12:00:00',
    status: 'Почти заполнен'
  },
  {
    id: 'R2D20877',
    routeId: 'spb-msk',
    vehicle: 'Фура 5 т',
    deadline: '23:45:59',
    customer: 'OZON',
    customerType: 'Маркетплейс',
    fromCity: 'Москва',
    fromAddress: 'ул. Тверская, 15',
    toCity: 'Казань',
    toAddress: 'ул. Лушина, 10',
    fillLevel: '95 м³ / 2,5 паллета / 720 кг',
    dateTime: '2026-09-13T14:00:00',
    status: 'Почти заполнен'
  },
  {
    id: 'BB79K2E2',
    routeId: 'msk-nn',
    vehicle: 'Фура 3 т',
    deadline: '00:00',
    customer: 'Я.Маркет',
    customerType: 'Маркетплейс',
    fromCity: 'Москва',
    fromAddress: 'ул. Арбат, 1',
    toCity: 'Казань',
    toAddress: 'ул. Кремлевская, 4',
    fillLevel: '145 м³ / 3,5 паллета / 1050 кг',
    dateTime: '2026-09-03T18:00:00',
    status: 'Закрыта'
  },
  {
    id: 'M90L451P',
    routeId: 'msk-nn',
    vehicle: 'Газель 1,5 т',
    deadline: '00:00',
    customer: 'OZON',
    customerType: 'Маркетплейс',
    fromCity: 'Москва',
    fromAddress: 'ул. Охотный ряд, 2',
    toCity: 'Казань',
    toAddress: 'ул. Декабристов, 1',
    fillLevel: '100 м³ / 2 паллеты / 780 кг',
    dateTime: '2026-09-02T09:00:00',
    status: 'Открыта'
  }
]

function generateMonth(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const weeks = []
  let week = []

  for (let i = 0; i < first.getDay(); i++) week.push(null)
  for (let day = 1; day <= last.getDate(); day++) {
    week.push(new Date(year, month, day))
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  while (week.length < 7) week.push(null)
  weeks.push(week)
  return weeks
}

function monthName(d) {
  return d.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
}

function formatDateTimeHuman(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatDateHuman(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

function DateFilter({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [calendarDate, setCalendarDate] = useState(() =>
    value ? new Date(value) : new Date()
  )
  const [tempDate, setTempDate] = useState(() =>
    value ? new Date(value) : new Date()
  )

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const week = new Date()
  week.setDate(today.getDate() + 7)

  const handleDayClick = (day) => {
    if (!day) return
    const updated = new Date(tempDate)
    updated.setFullYear(day.getFullYear(), day.getMonth(), day.getDate())
    setTempDate(updated)
  }

  const quickSet = (days) => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    setTempDate(d)
    setCalendarDate(new Date(d))
  }

  const apply = () => {
    const iso = tempDate.toISOString().slice(0, 10)
    onChange(iso)
    setOpen(false)
  }

  return (
    <div className="shipments-date-control">
      <label>Дата отправления</label>
      <div className="date-field">
        <div className="date-input-wrapper" onClick={() => setOpen(true)}>
          <input
            type="text"
            className="field-input"
            placeholder="Выбрать дату"
            readOnly
            value={value ? formatDateHuman(value) : ''}
          />
          <button type="button" className="calendar-btn">
            📅
          </button>
        </div>

        {open && (
          <div className="date-modal">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-month">{monthName(calendarDate)}</div>
                <div className="modal-nav">
                  <button
                    type="button"
                    onClick={() =>
                      setCalendarDate(
                        (prev) =>
                          new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                      )
                    }
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCalendarDate(
                        (prev) =>
                          new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                      )
                    }
                  >
                    ›
                  </button>
                </div>
              </div>

              <table className="calendar-table">
                <thead>
                  <tr>
                    {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map((d) => (
                      <th key={d}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {generateMonth(calendarDate).map((weekRow, wIdx) => (
                    <tr key={wIdx}>
                      {weekRow.map((day, dIdx) => {
                        if (!day) return <td key={dIdx}></td>
                        const isSelected =
                          tempDate &&
                          tempDate.toDateString() === day.toDateString()
                        return (
                          <td
                            key={dIdx}
                            className={isSelected ? 'selected' : ''}
                            onClick={() => handleDayClick(day)}
                          >
                            {day.getDate()}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="modal-quick">
                <button type="button" onClick={() => quickSet(0)}>
                  Сегодня
                </button>
                <button type="button" onClick={() => quickSet(1)}>
                  Завтра
                </button>
                <button type="button" onClick={() => quickSet(7)}>
                  {formatDateHuman(week.toISOString().slice(0, 10))}
                </button>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setOpen(false)}>
                  Закрыть
                </button>
                <button type="button" onClick={apply}>
                  Применить
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function OnlineTable() {
  const [selectedRouteIds, setSelectedRouteIds] = useState(['all'])
  const [appliedRouteIds, setAppliedRouteIds] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [vehicleFilter, setVehicleFilter] = useState(null)
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('all')
  const [pageInput, setPageInput] = useState('1')
  const pageSize = 5

  const filteredShipments = useMemo(() => {
    let base = shipmentsMock
      .filter((s) =>
        appliedRouteIds.length
          ? appliedRouteIds.includes(s.routeId)
          : true
      )
      .filter((s) =>
        selectedDate ? s.dateTime.slice(0, 10) === selectedDate : true
      )
      .filter((s) => (vehicleFilter ? s.vehicle.startsWith(vehicleFilter) : true))
      .filter((s) => {
        if (statusFilter === 'all') return true
        if (statusFilter === 'open') return s.status === 'Открыта'
        if (statusFilter === 'almost') return s.status === 'Почти заполнен'
        if (statusFilter === 'closed') return s.status === 'Закрыта'
        return true
      })

    return base
  }, [appliedRouteIds, selectedDate, vehicleFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredShipments.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filteredShipments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleJump = (value) => {
    const n = Number(value)
    if (!Number.isFinite(n)) return
    const clamped = Math.min(Math.max(1, n), totalPages)
    setPage(clamped)
    setPageInput(String(clamped))
  }

  return (
    <div className="online-table-page">
      <div className="container">
        <header className="online-table-header">
          <h1 className="online-table-title">Онлайн‑таблица</h1>
          <p className="online-table-subtitle">
            Отслеживайте актуальные отправления в режиме реального времени, находите подходящий рейс
            и бронируйте места для вашего груза.
          </p>
        </header>

        <section className="online-table-popular">
          <div className="popular-header">
            <h2>Популярные маршруты</h2>
            
          </div>
          <div className="popular-routes">
            {popularRoutes.map((route) => {
              const isAll = route.id === 'all'
              const isActive = isAll
                ? selectedRouteIds.includes('all')
                : selectedRouteIds.includes(route.id)

              const baseClass =
                'popular-route' + (isAll ? ' popular-route--all' : '')

              return (
                <button
                  key={route.id}
                  type="button"
                  className={
                    isActive
                      ? `${baseClass} popular-route--active`
                      : baseClass
                  }
                  onClick={() => {
                    if (isAll) {
                      setSelectedRouteIds(['all'])
                      return
                    }
                    setSelectedRouteIds((prev) => {
                      const next = prev.filter((id) => id !== 'all')
                      return next.includes(route.id)
                        ? next.filter((id) => id !== route.id)
                        : [...next, route.id]
                    })
                  }}
                >
                  {route.id === 'all' ? (
                    route.label
                  ) : (
                    <span className="popular-route-inner">
                      <span>{route.from}</span>
                      <img src={arrowIcon} alt="" className="popular-route-arrow" />
                      <span>{route.to}</span>
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          <button
            type="button"
            className="popular-cta-btn"
            onClick={() => {
              const routes =
                selectedRouteIds.includes('all')
                  ? []
                  : selectedRouteIds.filter((id) => id !== 'all')
              setAppliedRouteIds(routes)
              setPage(1)
            }}
          >
            Применить
          </button>
        </section>

        <section className="online-table-shipments">
          <div className="shipments-header">
            <div className="shipments-header-text">
              <h2>Отправления</h2>
              <p>Список ближайших рейсов с доступными местами для вашего груза</p>
            </div>
            <div className="shipments-header-right">
              <div className="shipments-status-tags">
                {[
                  { id: 'all', label: 'Все уровни заполнения' },
                  { id: 'open', label: 'Идет прием' },
                  { id: 'almost', label: 'Почти заполнен' },
                  { id: 'closed', label: 'Закрыт' }
                ].map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    className={
                      statusFilter === tag.id
                        ? 'status-tag status-tag--active'
                        : 'status-tag'
                    }
                    onClick={() => {
                      setStatusFilter(tag.id)
                      setPage(1)
                    }}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
              <div className="shipments-header-controls">
                <DateFilter
                  value={selectedDate}
                  onChange={(val) => {
                    setSelectedDate(val)
                    setPage(1)
                  }}
                />
                <button
                  type="button"
                  className="shipments-filter-btn"
                  onClick={() => setFilterModalOpen(true)}
                >
                  Фильтры
                </button>
              </div>
            </div>
          </div>

            <div className="shipments-table">
            <div className="shipments-row shipments-row--head">
              <div>Дедлайн</div>
              <div>Тип авто</div>
              <div>ID заказа</div>
              <div>Заказчик</div>
              <div>Направление</div>
              <div>Уровень заполненности</div>
              <div>Дата отправки</div>
              <div>Статус</div>
            </div>
            {pageItems.map((s) => (
              <div key={s.id} className="shipments-row">
                <div className="cell-deadline">{s.deadline}</div>
                <div className="cell-vehicle">{s.vehicle}</div>
                <div className="cell-code">{s.id}</div>
                <div className="cell-customer">
                  <div className="customer-name">{s.customer}</div>
                  <div className="customer-type">{s.customerType}</div>
                </div>
                <div className="cell-route">
                  <div className="route-stack">
                    <div className="route-indicator">
                      <span className="route-dot route-dot--start" />
                      <span className="route-line" />
                      <span className="route-dot route-dot--end" />
                    </div>
                    <div className="route-text">
                      <div>
                        <span className="route-city">{s.fromCity}</span>, {s.fromAddress}
                      </div>
                      <div>
                        <span className="route-city">{s.toCity}</span>, {s.toAddress}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cell-fill">{s.fillLevel}</div>
                <div>{formatDateTimeHuman(s.dateTime)}</div>
                <div>
                  <span
                    className={`status-badge ${
                      s.status === 'Почти заполнен'
                        ? 'status-badge--мало-мест'
                        : `status-badge--${s.status}`
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
            {filteredShipments.length === 0 && (
              <div className="shipments-empty">По выбранным фильтрам отправлений нет</div>
            )}
          </div>

          <div className="shipments-footer">
            <div className="shipments-pagination">
              <button
                type="button"
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Назад
              </button>
              {Array.from({ length: totalPages }, (_, idx) => {
                const pageNumber = idx + 1
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    className={
                      pageNumber === currentPage
                        ? 'page-btn page-btn--active'
                        : 'page-btn'
                    }
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              })}
              <button
                type="button"
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setPage((p) => Math.min(totalPages, p + 1))
                }
              >
                Далее
              </button>
            </div>
            <div className="shipments-page-jump">
              <span>Перейти на страницу</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleJump(pageInput)
                  }
                }}
                onBlur={() => handleJump(pageInput)}
              />
            </div>
          </div>
        </section>
      </div>

      <section className="online-table-faq">
        <div className="container">
          <FaqSection
            title="Ответы на вопросы"
            subtitle="Собрали популярные вопросы по работе онлайн‑таблицы и бронированию мест."
            linkTo="/faq"
            linkText="Перейти в раздел FAQ"
          />
        </div>
      </section>

      <OfferSection title="Не нашли нужный рейс?" />

      {filterModalOpen && (
        <div className="shipments-filter-backdrop" onClick={() => setFilterModalOpen(false)}>
          <div
            className="shipments-filter-modal"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="filter-modal-header">
              <h3>Фильтр</h3>
              <button
                type="button"
                className="filter-close"
                onClick={() => setFilterModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="filter-group">
              <h4>Сортировать по</h4>
              <div className="filter-chips">
                {[
                  { id: 'popular', label: 'Популярности' },
                  { id: 'few-seats', label: 'Мало мест' },
                  { id: 'many-seats', label: 'Много мест' },
                  { id: 'soon', label: 'Ближайшая дата отправки' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={
                      sortBy === opt.id ? 'filter-chip filter-chip--active' : 'filter-chip'
                    }
                    onClick={() => setSortBy(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4>Тип авто</h4>
              <div className="filter-chips">
                {['Каблук', 'Газель 1,5 т', 'Фургон 3 т', 'Фура 5 т'].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className={
                      vehicleFilter === label ? 'filter-chip filter-chip--active' : 'filter-chip'
                    }
                    onClick={() =>
                      setVehicleFilter((prev) => (prev === label ? null : label))
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-actions">
              <button
                type="button"
                className="filter-reset"
                onClick={() => {
                  setSortBy('popular')
                  setVehicleFilter(null)
                  setSelectedDate('')
                }}
              >
                Сбросить
              </button>
              <button
                type="button"
                className="filter-apply"
                onClick={() => setFilterModalOpen(false)}
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OnlineTable

