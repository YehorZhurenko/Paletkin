function DocumentsCtaSection() {
  return (
    <section className="bottom-ctas">
      <div className="container">
        <div className="cta-grid">
          <div className="cta-card left-card">
            <h3>Нужны другие документы?</h3>
            <p>
              Если вам требуются дополнительные документы или у вас есть вопросы,
              свяжитесь с нашими специалистами
            </p>
            <a href="mailto:logistic@paletkin.pro" className="email-link">
              logistic@paletkin.pro →
            </a>
          </div>

          <div className="cta-card right-card">
            <h3>Готовы отправить груз?</h3>
            <p>Две минуты на оформление, остальное за нами. Доставим день в день</p>
            <form className="cta-form">
              <input
                type="tel"
                placeholder="Ваш номер телефона"
                className="cta-input"
                required
              />
              <button type="submit" className="order-cta-btn">
                Оставить заявку
              </button>
            </form>
            <span className="cta-notice">
              Нажимая кнопку, вы соглашаетесь с нашей политикой конфиденциальности
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DocumentsCtaSection

