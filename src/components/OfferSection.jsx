function OfferSection({ title = 'Готовы отправить груз?' }) {
  return (
    <div className="qta-faq-section">

<section className="offer">

    <h3>Не нашли ответ на свой вопрос?</h3>
    <p>Свяжитесь с нами любым удобным способом</p>
    <button type="submit" className="order-offer-btn">
          Контакты
        </button>

</section>

    <section className="offer">
      <h3>{title}</h3>
      <p>Две минуты на оформление, остальное за нами. Доставим день в день</p>
      <form className="offer-form">
        <input
          type="tel"
          placeholder="Ваш номер телефона"
          className="offer-input"
          required
        />
        <button type="submit" className="order-offer-btn">
          Оставить заявку
        </button>
      </form>
      <span className="offer-notice">
        Нажимая кнопку, вы согласаетесь с нашей политикой конфиденциальности
      </span>
    </section>
    </div>
  )
}

export default OfferSection

