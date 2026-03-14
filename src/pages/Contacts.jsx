import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import './Contacts.css'

import link from "../assets/image/icons/link.svg"

import OfferSection from '../components/OfferSection'
import TopDesc from '../components/TopDesc'
import Breadcrumbs from '../components/Breadcrumbs'


function Contacts() {
  useEffect(() => {
    // Fix for default marker icons in Leaflet
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  }, [])

  // Custom marker icon
  const customIcon = L.divIcon({
    html: `
      <div class="custom-marker">
        <div class="marker-circle">
          <span class="marker-text">M</span>
        </div>
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [60, 60],
    iconAnchor: [30, 30],
  })

  const moscowPosition = [55.7558, 37.6173]

  return (
    <div className="page">
      <div className="page__breadcrumbs">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Контакты' }]} />
        </div>
      </div>
      <div className="page__content">
    <div className="contacts-page">
      <section className="contacts">
        <div className="container">
          <div className="contacts-header">
            <TopDesc
              title="Контакты"
              body="Выберите удобный способ связи. Мы всегда готовы ответить на ваши вопросы и помочь с решением логистических задач."
            />
          </div>
          <div className="contacts-links">
            <div className="contacts-item">
              <p>Номер телефона</p>
              <a href="tel:+79933430444">+7 (993) 343-04-44
                <img src={link} alt="link" />
              </a>
            </div>
            <div className="contacts-item">
              <p>Эл. почта</p>
              <a href="mailto:logistic@paletkin.pro">logistic@paletkin.pro
                <img src={link} alt="link" />
              </a>
            </div>
            <div className="contacts-item">
              <p>Telegram</p>
              <a href="https://t.me/Paletkin" target="_blank" rel="noopener noreferrer">@Paletkin
                <img src={link} alt="link" />
              </a>
            </div>
            <div className="contacts-item">
              <p>Telegram-новостник</p>
              <a href="mailto:logistic@paletkin.pro" target="_blank" rel="noopener noreferrer">logistic@paletkin.pro
                <img src={link} alt="link" />
              </a>
            </div>
            <div className="contacts-item">
              <p>Telegram-bot</p>
              <a href="https://t.me/Paletkin_bot" target="_blank" rel="noopener noreferrer">@Paletkin_bot
                <img src={link} alt="link" />
              </a>
            </div>
          </div>
          <div className="contacts-map-container">
            <MapContainer 
              center={moscowPosition} 
              zoom={11} 
              scrollWheelZoom={true}
              className="contacts-map"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.tile.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={moscowPosition} icon={customIcon}>
                <Popup className="custom-popup">
                  <div className="popup-content">
                    <h3>Москва</h3>
                    <p>Moscow, Russia</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
            
            <div className="map-info-block">
              <div className="info-block-header">
                <h3>От Путилково</h3>
                <span className="distance">320 м</span>
              </div>
              <button className="route-button">Проложить маршрут</button>
            </div>
          </div>
           <div className="work-time">
              <div className="work-title">Время работы</div>
              <div className="work-info">
              
                Пн-Сб: 9:00-18:00 &nbsp;  <span>Вс: выходной</span>

              </div>
          </div>
        
        </div>
      </section>

      <OfferSection title="Готовы отправить груз?" />
    </div>
      </div>
    </div>
  )
}

export default Contacts
