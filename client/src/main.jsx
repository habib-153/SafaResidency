import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import router from './routes/routes.jsx'
import { ThemeProvider } from '@material-tailwind/react'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster position="top-center" />
        </ThemeProvider> 
      </PersistGate>
    </Provider>
  </StrictMode>,
)
