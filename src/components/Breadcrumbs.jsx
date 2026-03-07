import { Link } from 'react-router-dom'
import './Breadcrumbs.css'
import homeIcon from '../assets/image/icons/home.svg'
import vectorIcon from '../assets/image/icons/vector.svg'

/**
 * @param {Array<{ label: string, to?: string }>} items — цепочка: [{ label: 'Главная', to: '/' }, { label: 'Имя страницы' }]
 *    Последний элемент без to — текущая страница (без ссылки).
 */
function Breadcrumbs({ items = [] }) {
  if (!items.length) return null

  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const isFirst = index === 0

        return (
          <span key={index} className="breadcrumbs__part">
            {!isFirst && (
              <img src={vectorIcon} alt="" className="breadcrumbs__sep" aria-hidden />
            )}
            {isFirst ? (
              <Link to={item.to || '/'} className="breadcrumbs__link breadcrumbs__link--home">
                <img src={homeIcon} alt="" className="breadcrumbs__home-icon" aria-hidden />
                <span>{item.label}</span>
              </Link>
            ) : isLast ? (
              <span className="breadcrumbs__current">{item.label}</span>
            ) : (
              <Link to={item.to || '#'} className="breadcrumbs__link">
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
