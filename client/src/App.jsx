import './App.css'
import { Outlet } from 'react-router-dom'
import Footer from './Shared/Footer'
import Nav from './Shared/Header/Nav'
import CookieConsentModal from './Components/Home/CookieModal/CookieModal'

function App() {

  return (
    <>
    <Nav />
      <div className='min-h-[calc(100vh-68px)] overflow-hidden'>
        <Outlet />
      </div>
      <Footer/>
      <CookieConsentModal />
    </>
  )
}

export default App
