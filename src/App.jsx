import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Documents from './pages/Documents'
import Services from './pages/Services'
import About from './pages/About'
import Marketplace from './pages/Marketplace'
import Checkout from './pages/Checkout'
import Contacts from './pages/Contacts'
import FAQ from './pages/FAQ'
import OnlineTable from './pages/OnlineTable'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/online-table" element={<OnlineTable />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
