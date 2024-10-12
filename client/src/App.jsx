import './App.css'
import { Outlet } from 'react-router-dom'
import Footer from './Shared/Footer'
import Nav from './Shared/Header/Nav'
import { StickyNavbar } from './Shared/Navbar'

function App() {

  return (
    <>
    <Nav />
      {/* <StickyNavbar /> */}
      <div className=' min-h-[calc(100vh-68px)] overflow-hidden'>
        <Outlet />
      </div>
      <Footer/>
    </>
  )
}

export default App
