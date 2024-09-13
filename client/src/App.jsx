import './App.css'
import { Outlet } from 'react-router-dom'
import Footer from './Shared/Footer'
import { StickyNavbar } from './Shared/Navbar'

function App() {

  return (
    <>
      <StickyNavbar />
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer/>
    </>
  )
}

export default App
