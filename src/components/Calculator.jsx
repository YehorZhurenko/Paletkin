import { useState, useEffect, useRef } from 'react'
import { load } from '@2gis/mapgl'
import './Calculator.css'

import car1 from '../assets/image/cars/item-car.png'
import car2 from '../assets/image/cars/item-car2.png'
import car3 from '../assets/image/cars/item-car3.png'
import car4 from '../assets/image/cars/item-car4.png'
import car5 from '../assets/image/cars/item-car5.png'

// map marker images
import defaultIconImg from '../assets/image/map/default.svg'
import subpointIconImg from '../assets/image/map/subpoint.svg'
import finishIconImg from '../assets/image/map/finish.svg'

import switch_icon from '../assets/image/icons/switch.svg'
import append_icon from '../assets/image/icons/append.svg'
import delete_icon from '../assets/image/icons/delete.svg'

import calendar_icon from '../assets/image/icons/calendar.svg'
import checkmark from '../assets/image/icons/checkmark.svg'

import nds22 from '../assets/image/payment/nds.svg'
import nds0 from '../assets/image/payment/nds0.svg'
import cash from '../assets/image/payment/cash.svg'

import evro_pallet from '../assets/image/pallet/evro-pallet.svg'
import fin_pallet from '../assets/image/pallet/fin-pallet.svg'
import am_pallet from '../assets/image/pallet/amer-pallet.svg'

import pen from '../assets/image/icons/pen.svg'


// import shared CTA form
// import CtaFormBlock from './CtaFormBlock'

// simple wrapper for geocoding using Nominatim
// IMPORTANT: этот сервис часто блокирует CORS, поэтому все ошибки гасим и просто не подставляем адрес,
// чтобы карта продолжала работать.
async function geocode(text) {
  if (!text) return null
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      text,
    )}`
    const res = await fetch(url)
    if (!res.ok) return null
    const json = await res.json()
    if (json && json.length) {
      return {
        coords: { lat: parseFloat(json[0].lat), lng: parseFloat(json[0].lon) },
        address: json[0].display_name,
      }
    }
  } catch (err) {
    console.warn('Geocode error (Nominatim, возможно CORS):', err)
  }
  return null
}

async function reverseGeocode(lat, lng) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    const res = await fetch(url)
    if (!res.ok) return ''
    const json = await res.json()
    if (json && json.display_name) {
      return json.display_name
    }
  } catch (err) {
    console.warn('Reverse geocode error (Nominatim, возможно CORS):', err)
  }
  return ''
}

// 2GIS map: ключ в .env — VITE_2GIS_MAP_KEY (https://dev.2gis.com/)
function Map2GIS({ containerId, mapRef, center, zoom, stops, onMapClick, markerIcons, routeCoords }) {
  const mapglRef = useRef(null)
  const markersRef = useRef([])
  const polylineRef = useRef(null)

  useEffect(() => {
    let map
    let cancelled = false
    const key = import.meta.env.VITE_2GIS_MAP_KEY || ''
    if (!key) {
      console.warn('VITE_2GIS_MAP_KEY не задан — добавьте в .env. Карта 2GIS не загружена.')
      return
    }

    const initMap = async () => {
      try {
        // On some Windows setups WebGPU is present but has no available adapter.
        // In that case 2GIS SDK may spam console with adapter errors.
        if (navigator.gpu && typeof navigator.gpu.requestAdapter === 'function') {
          const adapter = await navigator.gpu.requestAdapter()
          if (!adapter) {
            console.warn('WebGPU adapter недоступен. Карта 2GIS пропущена для этой среды.')
            return
          }
        }

        const mapgl = await load()
        if (cancelled) return
        mapglRef.current = mapgl
        // MapGL ожидает координаты в формате [lng, lat]
        map = new mapgl.Map(containerId, {
          center: [center[1], center[0]],
          zoom,
          key,
          zoomControl: false,
        })
        mapRef.current = map
        map.on('click', (e) => {
          const [lng, lat] = e.lngLat
          onMapClick({ lat, lng })
        })
      } catch (err) {
        console.warn('2GIS MapGL не инициализирован:', err)
      }
    }

    initMap()

    return () => {
      cancelled = true
      markersRef.current.forEach((m) => m.destroy())
      markersRef.current = []
      if (polylineRef.current) {
        polylineRef.current.destroy()
        polylineRef.current = null
      }
      if (map) {
        map.destroy()
        mapRef.current = null
      }
      mapglRef.current = null
    }
  }, [containerId, center[0], center[1], zoom])

  useEffect(() => {
    if (!mapRef.current || !mapglRef.current) return
    const map = mapRef.current
    const mapgl = mapglRef.current

    // обновляем маркеры
    markersRef.current.forEach((m) => m.destroy())
    markersRef.current = []
    stops.forEach((stop, idx) => {
      if (!stop.coords) return
      const icon =
        idx === 0 ? markerIcons.start : idx === stops.length - 1 ? markerIcons.end : markerIcons.via
      const marker = new mapgl.Marker(map, {
        coordinates: [stop.coords.lng, stop.coords.lat],
        icon,
        iconSize: [32, 40],
      })
      markersRef.current.push(marker)
    })

    // обновляем маршрут между точками
    if (polylineRef.current) {
      polylineRef.current.destroy()
      polylineRef.current = null
    }
    const routeCoordinates = Array.isArray(routeCoords) ? routeCoords : []
    if (routeCoordinates.length >= 2) {
      polylineRef.current = new mapgl.Polyline(map, {
        coordinates: routeCoordinates,
        strokeColor: '#F87F07',
        strokeWidth: 4,
        strokeDasharray: [6, 6],
      })
    }
  }, [stops, markerIcons.start, markerIcons.via, markerIcons.end, routeCoords])

  return null
}

export default function CalculatorComponent({ mode = 'estimate' }) {
  // mode: 'estimate' — простая оценка; 'checkout' — оформление (с полем комментария)
  const mapContainerIdRef = useRef('calc-map-2gis-' + Math.random().toString(36).slice(2))
  const markerIcons = {
    start: defaultIconImg,
    via: subpointIconImg,
    end: finishIconImg,
  }

  // instead of single from/to we keep a list of stops (first = from, last = to)
  const [stops, setStops] = useState([
    { address: '', coords: null },
    { address: '', coords: null },
  ])
  const [activeIndex, setActiveIndex] = useState(0)
  const [addingStop, setAddingStop] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(10)

  // additional form state
  const [companyName, setCompanyName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [cargoType, setCargoType] = useState('Сборный груз')
  const [vehicleIndex, setVehicleIndex] = useState(0)
  const [services, setServices] = useState({
    loading: false,
    unloading: false,
    return: false,
    palletization: false,
  })
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [businessDelivery, setBusinessDelivery] = useState(false)

  // pallet / cargo state for сборный груз
  const palletOptions = [
    { img: evro_pallet, id: 'eu', name: 'Европоддон', dims: '1,2 × 0,8 × 1,8м', factor: 1.0 },
    { img: fin_pallet, id: 'fin', name: 'Финский', dims: '1,2 × 1,2 × 1,8м', factor: 1.25 },
    { img: am_pallet, id: 'am', name: 'Американский', dims: '1,0 × 1,0 × 1,8м', factor: 1.5 },
  ]
  const [selectedPallet, setSelectedPallet] = useState(null)
  const [manualDimensions, setManualDimensions] = useState(false)
  const [cargoWeight, setCargoWeight] = useState('')
  const [palletCount, setPalletCount] = useState('')

  const [pickupDate, setPickupDate] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')

  const [pickupQuickPreset, setPickupQuickPreset] = useState(null)
  const [deliveryQuickPreset, setDeliveryQuickPreset] = useState(null)

  const [dateModalOpen, setDateModalOpen] = useState(false)
  const [dateModalField, setDateModalField] = useState(null)
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [tempDate, setTempDate] = useState(new Date())

  const [comment, setComment] = useState('')

  const mapRef = useRef(null)
  const pickupDateFieldRef = useRef(null)
  const deliveryDateFieldRef = useRef(null)
  const vehicleCarouselRef = useRef(null)
  const vehicleTrackRef = useRef(null)
  const vehicleCardRefs = useRef([])
  const [edgeFadedCards, setEdgeFadedCards] = useState(new Set())
  const [vehicleAtStart, setVehicleAtStart] = useState(true)
  const [vehicleAtEnd, setVehicleAtEnd] = useState(false)
  const [isVehicleTouching, setIsVehicleTouching] = useState(false)

  const [routeData, setRouteData] = useState({
    distanceKm: 0,
    durationMin: 0,
    coordinates: [],
  })

  useEffect(() => {
    const coords = stops.map((s) => s.coords).filter(Boolean)
    if (coords.length < 2) {
      setRouteData({ distanceKm: 0, durationMin: 0, coordinates: [] })
      return
    }

    const points = coords.map((c) => `${c.lng},${c.lat}`).join(';')
    const url = `https://router.project-osrm.org/route/v1/driving/${points}?overview=full&geometries=geojson`
    let cancelled = false

    ;(async () => {
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Route HTTP ${res.status}`)
        const data = await res.json()
        if (cancelled) return
        if (!data.routes || !data.routes.length) {
          setRouteData({ distanceKm: 0, durationMin: 0, coordinates: [] })
          return
        }
        const route = data.routes[0]
        const distanceKm = route.distance / 1000
        const durationMin = Math.round(route.duration / 60)
        const coordinates = route.geometry?.coordinates || []
        setRouteData({ distanceKm, durationMin, coordinates })
      } catch (err) {
        console.warn('Route calculation error (OSRM):', err)
        // запасной вариант — просто ломаная по точкам
        const fallbackCoords = coords.map((c) => [c.lng, c.lat])
        setRouteData((prev) => ({
          distanceKm: prev.distanceKm || 0,
          durationMin: prev.durationMin || 0,
          coordinates: fallbackCoords,
        }))
      }
    })()

    return () => {
      cancelled = true
    }
  }, [stops])

  const formatDuration = (minutes) => {
    if (!minutes || minutes <= 0) return ''
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    if (h && m) return `${h} ч ${m} мин`
    if (h) return `${h} ч`
    return `${m} мин`
  }

  // when user types address, geocode and move map/marker
  const handleAddressChange = async (index, value) => {
    const updated = [...stops]
    updated[index].address = value
    setStops(updated)
    if (value.trim()) {
      const result = await geocode(value)
      if (result) {
        updated[index].coords = result.coords
        setStops([...updated])
        if (mapRef.current) {
          // MapGL: [lng, lat]
          mapRef.current.setCenter([result.coords.lng, result.coords.lat])
          mapRef.current.setZoom(11)
        }
      }
    }
  }

  const handleMapClick = async ({ lat, lng }) => {
    if (addingStop) {
      if (stops.length >= 5) {
        setAddingStop(false)
        return
      }
      const fetchedAddress = await reverseGeocode(lat, lng)
      const address = fetchedAddress || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
      const newStop = { address, coords: { lat, lng } }
      const beforeLast = stops.slice(0, stops.length - 1)
      const last = stops[stops.length - 1]
      const updated = [...beforeLast, newStop, last]
      setStops(updated)
      setAddingStop(false)
      setActiveIndex(beforeLast.length)
      return
    }

    const fetchedAddress = await reverseGeocode(lat, lng)
    const address = fetchedAddress || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
    // Всегда ставим точку по текущему активному полю (activeIndex)
    const idx = Math.min(Math.max(activeIndex, 0), stops.length - 1)
    const updated = [...stops]
    updated[idx] = { address, coords: { lat, lng } }
    setStops(updated)
    setActiveIndex(idx)
  }

  // a list of quick city buttons used in screenshot
  const quickCities = ['Москва', 'Санкт-Петербург', 'Нижний Новгород', 'Казань']

  // vehicle catalog for carousel (fading at edges is computed by Intersection Observer)
  const vehicles = [
    { img: car1, title: 'Газель 3 м', price: 'от 2500₽', capacity: '1,5т' },
    { img: car2, title: 'Газель 3 м', price: 'от 2500₽', capacity: '1,5т' },
    { img: car3, title: 'Газель 3 м', price: 'от 2500₽', capacity: '1,5т' },
    { img: car4, title: 'Газель 3 м', price: 'от 2500₽', capacity: '1,5т' },
    { img: car5, title: 'Газель 3 м', price: 'от 2500₽', capacity: '1,5т' },
    { img: car5, title: 'Газель 3 м', price: 'от 2500₽', capacity: '1,5т' },

  ]

  const defaultPosition = [55.7558, 37.6173] // moscow

  // helpers for date picker
  const formatDateTime = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleString('ru-RU', { hour12: false })
  }

  const formatShortDate = (date) =>
    date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })

  const setFieldDate = (field, date, presetKey = null) => {
    const iso = date.toISOString().slice(0, 16)
    if (field === 'pickup') {
      setPickupDate(iso)
      setPickupQuickPreset(presetKey)
    } else if (field === 'delivery') {
      setDeliveryDate(iso)
      setDeliveryQuickPreset(presetKey)
    }
  }

  const openDateModal = (field) => {
    if (dateModalOpen && dateModalField === field) {
      setDateModalOpen(false)
      return
    }
    setDateModalField(field)
    const current = field === 'pickup' ? pickupDate : deliveryDate
    const base = current ? new Date(current) : new Date()
    setTempDate(base)
    setCalendarDate(new Date(base))
    setDateModalOpen(true)
  }

  useEffect(() => {
    if (!dateModalOpen) return
    const handler = (e) => {
      const activeRef = dateModalField === 'pickup' ? pickupDateFieldRef.current : deliveryDateFieldRef.current
      if (activeRef && !activeRef.contains(e.target)) setDateModalOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dateModalOpen, dateModalField])

  useEffect(() => {
    if (cargoType !== 'Выделенный транспорт') return
    const container = vehicleCarouselRef.current
    const cards = vehicleCardRefs.current.filter(Boolean)
    if (!container || !cards.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        setEdgeFadedCards((prev) => {
          const next = new Set(prev)
          entries.forEach((entry) => {
            const idx = parseInt(entry.target.dataset.index, 10)
            if (Number.isNaN(idx)) return
            if (entry.intersectionRatio < 1) next.add(idx)
            else next.delete(idx)
          })
          return next
        })
      },
      { root: container, threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    cards.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [cargoType, vehicles.length])

  useEffect(() => {
    if (cargoType !== 'Выделенный транспорт') return
    handleVehicleScroll()
  }, [cargoType, vehicles.length])

  useEffect(() => {
    if (cargoType !== 'Выделенный транспорт') return
    const lastIndex = vehicles.length - 1
    setVehicleAtStart(vehicleIndex === 0)
    setVehicleAtEnd(vehicleIndex === lastIndex)
  }, [cargoType, vehicleIndex, vehicles.length])

  const scrollToVehicle = (index) => {
    const track = vehicleTrackRef.current
    const card = vehicleCardRefs.current[index]
    if (!track || !card) return
    const target = card.offsetLeft - 64 // match horizontal padding in CSS
    track.scrollTo({ left: target, behavior: 'smooth' })
  }

  const handleVehicleScroll = () => {
    const track = vehicleTrackRef.current
    if (!track) return
    const totalScrollable = track.scrollWidth - track.clientWidth
    if (totalScrollable <= 0) {
      setVehicleAtStart(true)
      setVehicleAtEnd(true)
      return
    }
    const sl = track.scrollLeft
    const edgeTolerance = 4
    const atStart = sl <= edgeTolerance
    const atEnd = sl >= totalScrollable - edgeTolerance
    setVehicleAtStart(atStart)
    setVehicleAtEnd(atEnd)
  }

  const applyDate = () => {
    if (!dateModalField) return
    setFieldDate(dateModalField, tempDate, null)
    setDateModalOpen(false)
  }

  const quickSet = (days) => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    setTempDate(d)
    setCalendarDate(new Date(d))
  }

  const generateMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const first = new Date(year, month, 1)
    const last = new Date(year, month + 1, 0)
    const weeks = []
    let week = []
    // pad start
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

  const monthName = (d) =>
    d.toLocaleDateString('ru-RU', { month: 'short', year: 'numeric' })

  const handleDayClick = (day) => {
    if (!day) return
    const updated = new Date(tempDate)
    updated.setFullYear(day.getFullYear(), day.getMonth(), day.getDate())
    setTempDate(updated)
  }

  const handleTimeChange = (part, value) => {
    if (value === '') return
    let num = parseInt(value, 10)
    if (Number.isNaN(num)) return

    if (part === 'hours') {
      if (num < 0) num = 0
      if (num > 23) num = 23
      const updated = new Date(tempDate)
      updated.setHours(num)
      setTempDate(updated)
    } else if (part === 'minutes') {
      if (num < 0) num = 0
      if (num > 59) num = 59
      const updated = new Date(tempDate)
      updated.setMinutes(num)
      setTempDate(updated)
    }
  }

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const week = new Date()
  week.setDate(today.getDate() + 7)

  return (
    <div className="calculator-component">
      <div className="calc-map-wrapper">
        <div
          id={mapContainerIdRef.current}
          className="calc-map-2gis"
          style={{ width: '100%', height: '100%' }}
        />
        <Map2GIS
          containerId={mapContainerIdRef.current}
          mapRef={mapRef}
          center={defaultPosition}
          zoom={10}
          stops={stops}
          onMapClick={handleMapClick}
          markerIcons={markerIcons}
          routeCoords={routeData.coordinates}
        />
        <div className="map-hint">
          {routeData.distanceKm > 0 ? (
            <>
              <div>Расстояние: {routeData.distanceKm.toFixed(1)} км</div>
              <div>В пути ≈ {formatDuration(routeData.durationMin)}</div>
            </>
          ) : addingStop ? (
            'Кликните, чтобы добавить дополнительную точку'
          ) : (
            'Укажите точку на карте или в форме'
          )}
        </div>
        {/* overlay tools */}
        <div className="map-tools">
          <button
            type="button"
            className="add-stop-btn"
            onClick={() => {
              if (stops.length >= 5) return
              setAddingStop(true)
            }}
          >
            Указать доп. точку
          </button>
        </div>
        <div className="zoom-controls-overlay">
          <button
            type="button"
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.setZoom(mapRef.current.getZoom() + 1)
                setZoomLevel(Math.round(mapRef.current.getZoom()))
              }
            }}
          >
            +
          </button>
          <button
            type="button"
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.setZoom(mapRef.current.getZoom() - 1)
                setZoomLevel(Math.round(mapRef.current.getZoom()))
              }
            }}
          >
            -
          </button>
          <span className="zoom-level">{zoomLevel * 10}%</span>
        </div>
      </div>

      <div className="calc-form-wrapper">
        <div className="form-header">
          <h2>Расчет стоимости доставки на маркетплейсы</h2>
          <p>Укажите адреса погрузки и выгрузки, укажите параметры и получите ориентировочную стоимость</p>
        </div>
        
        <div className="address-block">
            <div className="address-requared">

              <div className="address-field address-field--from">
                <input
                  className="address-input field-input"
                  type="text"
                  value={stops[0].address}
                  onFocus={() => setActiveIndex(0)}
                  onChange={(e) => handleAddressChange(0, e.target.value)}
                  placeholder="Откуда забираем"
                />
                <div className="address-cities-group">
                  {['Москва', 'Санкт-Петербург'].map((city) => (
                    <button
                      key={city}
                      type="button"
                      className="address-city-tag"
                      onClick={() => handleAddressChange(0, city)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <button className="address-switch" type="button">
                <img src={switch_icon} alt="switch" />
                <span className="address-btn-label address-btn-switch">Поменять местами</span>
              </button>

              <div className="address-field address-field--to">
                <input
                  className="address-input field-input"
                  type="text"
                  value={stops[stops.length - 1].address}
                  onFocus={() => setActiveIndex(stops.length - 1)}
                  onChange={(e) => handleAddressChange(stops.length - 1, e.target.value)}
                  placeholder="Куда доставляем"
                />
                <div className="address-cities-group address-cities-group--to">
                  {['Нижний-Новгород', 'Казань'].map((city) => (
                    <button
                      key={city}
                      type="button"
                      className="address-city-tag"
                      onClick={() => handleAddressChange(stops.length - 1, city)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="address-append"
                onClick={() => {
                  if (stops.length >= 5) return
                  const beforeLast = stops.slice(0, stops.length - 1)
                  const last = stops[stops.length - 1]
                  const updated = [...beforeLast, { address: '', coords: null }, last]
                  setStops(updated)
                  setActiveIndex(beforeLast.length)
                }}
              >
                <img src={append_icon} alt="append" />
                <span className="address-btn-label">Добавить точку</span>
              </button>
            </div>
              
            {/* ===== ДОПОЛНИТЕЛЬНЫЕ ТОЧКИ ===== */}
            {stops.length > 2 && (
              <div className="extra-stops">
                <div className="extra-header">
                  <span>Дополнительные точки</span>
                </div>

                {stops.slice(1, stops.length - 1).map((stop, idx) => {
                  const realIndex = idx + 1

                  return (
                    <div key={realIndex} className="extra-item">
                      <input
                        className="address-input field-input"
                        type="text"
                        value={stop.address}
                        onFocus={() => setActiveIndex(realIndex)}
                        onChange={(e) => handleAddressChange(realIndex, e.target.value)}
                        placeholder="Введите адрес"
                      />
                      <button
                        className="extra-delete"
                        type="button"
                        onClick={() => {
                          const updated = [...stops]
                          updated.splice(realIndex, 1)
                          setStops(updated)
                        }}
                      >
                        <img src={delete_icon} alt="delete_icon" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
        </div>
        
        {mode === 'checkout' && (
        <div className="main-info">
          
          <h4 className="info-title">
            Основная информация *
          </h4>

          <div className="basic-info">
            <div className="basic-row">
              <input type="text" className='field-input' placeholder="Название компании" />

              <input type="tel" className='field-input' placeholder="Контактный телефон" />
            </div>
          </div>

          <div className="date-row">
            <div className="date-field" ref={pickupDateFieldRef}>
              <div
                className="date-input-wrapper"
                onClick={() => openDateModal('pickup')}
              >
                <input
                  type="text"
                  className="field-input"
                  placeholder="Дата и время заугрзки"
                  readOnly
                  value={formatDateTime(pickupDate)}
                />
                <button type="button" className="calendar-btn">
                    <img src={calendar_icon} alt="Calendar" />
                </button>
              </div>

              {dateModalOpen && dateModalField === 'pickup' && (
                <div className="date-modal">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="modal-month">
                        {monthName(calendarDate)}
                      </div>
                      <div className="modal-nav">
                        <button
                          type="button"
                          onClick={() =>
                            setCalendarDate(
                              (prev) =>
                                new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
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
                                new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
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
                        {formatShortDate(week)}
                      </button>
                    </div>

                    <div className="modal-time">
                      <label>Время *</label>
                      <div className="time-inputs">
                        <input
                          type="number"
                          min="0"
                          max="23"
                          value={String(tempDate.getHours()).padStart(2, '0')}
                          onChange={(e) => handleTimeChange('hours', e.target.value)}
                        />
                        <span>:</span>
                        <input
                          type="number"
                          min="0"
                          max="59"
                          value={String(tempDate.getMinutes()).padStart(2, '0')}
                          onChange={(e) => handleTimeChange('minutes', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="modal-actions">
                      <button type="button" onClick={() => setDateModalOpen(false)}>
                        Закрыть
                      </button>
                      <button type="button" onClick={applyDate}>
                        Применить
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="quick-dates">
                <button
                  type="button"
                  className={pickupQuickPreset === 'today' ? 'active' : ''}
                  onClick={() => {
                    const d = new Date()
                    setFieldDate('pickup', d, 'today')
                  }}
                >
                  Сегодня
                </button>
                <button
                  type="button"
                  className={pickupQuickPreset === 'tomorrow' ? 'active' : ''}
                  onClick={() => {
                    const d = new Date()
                    d.setDate(d.getDate() + 1)
                    setFieldDate('pickup', d, 'tomorrow')
                  }}
                >
                  Завтра
                </button>
                <button
                  type="button"
                  className={pickupQuickPreset === 'week' ? 'active' : ''}
                  onClick={() => {
                    const d = new Date()
                    d.setDate(d.getDate() + 7)
                    setFieldDate('pickup', d, 'week')
                  }}
                >
                  {formatShortDate(week)}
                </button>
              </div>
            </div>
            
            <div className="date-field" ref={deliveryDateFieldRef}>
              <div
                className="date-input-wrapper"
                onClick={() => openDateModal('delivery')}
              >
                <input
                  type="text"
                  className="field-input"
                  placeholder="Дата и время отгрузки"
                  readOnly
                  value={formatDateTime(deliveryDate)}
                />
                <button type="button" className="calendar-btn">
                    <img src={calendar_icon} alt="Calendar" />
                </button>
              </div>

              {dateModalOpen && dateModalField === 'delivery' && (
                <div className="date-modal">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="modal-month">
                        {monthName(calendarDate)}
                      </div>
                      <div className="modal-nav">
                        <button
                          type="button"
                          onClick={() =>
                            setCalendarDate(
                              (prev) =>
                                new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
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
                                new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
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
                        {formatShortDate(week)}
                      </button>
                    </div>

                    <div className="modal-time">
                      <label>Время *</label>
                      <div className="time-inputs">
                        <input
                          type="number"
                          min="0"
                          max="23"
                          value={String(tempDate.getHours()).padStart(2, '0')}
                          onChange={(e) => handleTimeChange('hours', e.target.value)}
                        />
                        <input
                          type="number"
                          min="0"
                          max="59"
                          value={String(tempDate.getMinutes()).padStart(2, '0')}
                          onChange={(e) => handleTimeChange('minutes', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="modal-actions">
                      <button type="button" onClick={() => setDateModalOpen(false)}>
                        Закрыть
                      </button>
                      <button type="button" onClick={applyDate}>
                        Применить
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="quick-dates">
                <button
                  type="button"
                  className={deliveryQuickPreset === 'today' ? 'active' : ''}
                  onClick={() => {
                    const d = new Date()
                    setFieldDate('delivery', d, 'today')
                  }}
                >
                  Сегодня
                </button>
                <button
                  type="button"
                  className={deliveryQuickPreset === 'tomorrow' ? 'active' : ''}
                  onClick={() => {
                    const d = new Date()
                    d.setDate(d.getDate() + 1)
                    setFieldDate('delivery', d, 'tomorrow')
                  }}
                >
                  Завтра
                </button>
                <button
                  type="button"
                  className={deliveryQuickPreset === 'week' ? 'active' : ''}
                  onClick={() => {
                    const d = new Date()
                    d.setDate(d.getDate() + 7)
                    setFieldDate('delivery', d, 'week')
                  }}
                >
                  {formatShortDate(week)}
                </button>
              </div>
            </div>
        </div>
        </div>
        )}
        
        <div className="transportation">
          <div className="cargo-type">
            <button
              className={cargoType === 'Сборный груз' ? 'active' : ''}
              onClick={() => setCargoType('Сборный груз')}
            >
              Сборный груз
            </button>
            <button
              className={cargoType === 'Выделенный транспорт' ? 'active' : ''}
              onClick={() => setCargoType('Выделенный транспорт')}
            >
              Выделенный транспорт
            </button>
          </div>

          {cargoType === 'Сборный груз' && (
            <div className="calc-animate-in">
              <div className="pallet-selector">
                {palletOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className={`pallet-card ${
                      selectedPallet === opt.id ? 'active' : ''
                    }`}
                    onClick={() => setSelectedPallet(opt.id)}
                  >

                    <img src={opt.img} alt={opt.name} />
                    <div className="pallet-card-text">
                      <div className="pallet-name">{opt.name}</div>
                      <div className="pallet-dims">
                        x{opt.dims}
                      </div>
                      <div className="pallet-coeff">
                        x {opt.factor}
                      </div>
                    </div>
                  </div>
                ))}
                
              </div>
              <button
                  type="button"
                  className="manual-dims-btn"
                  onClick={() => setManualDimensions(true)}
                >
                  Ввести габариты вручную
                  <img src={pen} alt="Edit" />
              </button>
              <div className="cargo-info">
                  <input className='field-input cargo-input' placeholder='Вес груза'
                    type="text"
                    value={cargoWeight}
                    onChange={(e) => setCargoWeight(e.target.value)}
                  />
 
                
                  <input className='field-input' placeholder='Кол-во паллет'
                    type="number"
                    value={palletCount}
                    onChange={(e) => setPalletCount(e.target.value)}
                  />
                
              </div>
            </div>
          )}

          {cargoType === 'Выделенный транспорт' && (
            <div className="calc-animate-in">
              <div
                className={`vehicle-carousel${isVehicleTouching ? ' vehicle-carousel--touching' : ''}`}
                ref={vehicleCarouselRef}
              >
                <button
                  type="button"
                  className="nav prev"
                  disabled={vehicleIndex === 0}
                  onClick={() =>
                    setVehicleIndex((i) => {
                      const next = Math.max(0, i - 1)
                      scrollToVehicle(next)
                      return next
                    })
                  }
                >
                  ‹
                </button>
                <div
                  className="vehicles"
                  ref={vehicleTrackRef}
                  onTouchStart={() => setIsVehicleTouching(true)}
                  onTouchEnd={() => setIsVehicleTouching(false)}
                  onTouchCancel={() => setIsVehicleTouching(false)}
                  onScroll={handleVehicleScroll}
                  style={{
                    paddingLeft: vehicleAtStart ? 24 : vehicleAtEnd ? 0 : 64,
                    paddingRight: vehicleAtEnd ? 24 : vehicleAtStart ? 0 : 64
                  }}
                >
                  {vehicles.map((v, idx) => (
                    <button
                      key={idx}
                      type="button"
                      data-index={idx}
                      ref={(el) => { vehicleCardRefs.current[idx] = el }}
                      className={`vehicle-card${idx === vehicleIndex ? ' vehicle-card--active' : ''}${
                        edgeFadedCards.has(idx) ? ' vehicle-card--edge' : ''
                      }`}
                      style={{ backgroundImage: `url(${v.img})` }}
                      onClick={() => {
                        setVehicleIndex(idx)
                        scrollToVehicle(idx)
                      }}
                    >
                      <div className="vehicle-card-weight">{v.capacity}</div>
                      <div className="vehicle-card-name">{v.title}</div>
                      <div className="vehicle-card-price">{v.price}</div>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="nav next"
                  disabled={vehicleIndex === vehicles.length - 1}
                  onClick={() =>
                    setVehicleIndex((i) => {
                      const next = Math.min(vehicles.length - 1, i + 1)
                      scrollToVehicle(next)
                      return next
                    })
                  }
                >
                  ›
                </button>
              </div>
              <input
                type="range"
                min="0"
                max={vehicles.length - 1}
                value={vehicleIndex}
                onChange={(e) => {
                  const next = Number(e.target.value)
                  setVehicleIndex(next)
                  scrollToVehicle(next)
                }}
                className="vehicle-slider-range"
              />
            </div>
          )}
        </div>

        <div className="services">
          <h4>Доп. услуги</h4>
          <div className="service-buttons">
            <button
              className={services.loading ? 'active' : ''}
              onClick={() =>
                setServices((s) => ({ ...s, loading: !s.loading }))
              }
            >
              Погрузка  ∙  700₽
              {services.loading && <img src={checkmark} alt="active" />}
            </button>
            <button
              className={services.unloading ? 'active' : ''}
              onClick={() =>
                setServices((s) => ({ ...s, unloading: !s.unloading }))
              }
            >
              Выгрузка  ∙  700₽
              {services.unloading && <img src={checkmark} alt="active" />}
            </button>
            <button
              className={services.return ? 'active' : ''}
              onClick={() =>
                setServices((s) => ({ ...s, return: !s.return }))
              }
            >
              Возврат  ∙  50% от км
              {services.return && <img src={checkmark} alt="active" />}
            </button>
            <button
              className={services.palletization ? 'active' : ''}
              onClick={() =>
                setServices((s) => ({ ...s, palletization: !s.palletization }))
              }
            >
              Паллетирование  ∙  по запросу
              {services.palletization && <img src={checkmark} alt="active" />}
            </button>
          </div>
        </div>

        <div className="payments">
          <div className="payment-options">
            <div className="payment">
              <div className="payment-image">
                <img src={nds22} alt="НДС 22%" />
              </div>
              
              <div className="payment-text">
                <div className="method">Безнал. расчет</div>
                <div className="details">НДС 22%</div>
              </div>
            </div>
            <div className="payment">
              <div className="payment-image">
                <img src={nds0} alt="Без НДС" />
              </div>
              <div className="payment-text">
                <div className="method">Безнал. расчет</div>
                <div className="details">Без НДС</div>
              </div>
            </div>
            <div className="payment">
              <div className="payment-image">
                <img src={cash} alt="Наличные" />
              </div>
              <div className="payment-text">
                <div className="method">Нал. расчет</div>
                <div className="details">Без НДС</div>
              </div>
            </div>
          </div>
        </div>

        {mode === 'checkout' && (
          <div className="calculator-comment">
            <h4 className="calculator-comment-title">Комментарий</h4>
            <textarea
              className="calculator-comment-field field-input"
              placeholder="Дополнительные пожелания или комментарий к заказу"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
        )}

        <div className="calculator-cta-block">
          <div className="calculator-cta-left">
            <label className="calculator-cta-toggle">
              <input
                type="checkbox"
                checked={businessDelivery}
                onChange={(e) => setBusinessDelivery(e.target.checked)}
                className="calculator-cta-toggle-input"
              />
              <span className="calculator-cta-toggle-slider" />
              <span className="calculator-cta-toggle-label">Бизнес доставка</span>
            </label>
          </div>
          <button type="button" className="calculator-cta-btn">
            Рассчитать стоимость
          </button>
            <p className="calculator-cta-disclaimer">
              Нажимая кнопку, вы соглашаетесь с нашей политикой конфиденциальности
            </p>
        </div>
      </div>
    </div>
  )
}
