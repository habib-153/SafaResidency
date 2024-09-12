
import './App.css'
import Footer from './Shared/Footer'
import Navbar from './Shared/Navbar'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <>
      <Navbar />
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer/>
    </>
  )
}

export default App
