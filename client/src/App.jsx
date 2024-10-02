import './App.css'
import { Outlet } from 'react-router-dom'
import Footer from './Shared/Footer'
import { StickyNavbar } from './Shared/Navbar'
import Nav from './Shared/Header/Nav'

function App() {

  return (
    <>
    <Nav />
      <StickyNavbar />
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer/>
    </>
  )
}

export default App
