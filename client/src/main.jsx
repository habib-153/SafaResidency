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
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n.js'
import { Suspense } from 'react'
import { Spin } from 'antd'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <Suspense fallback={<Spin className='w-full flex justify-center items-center mt-[25%]'/>}>
          <RouterProvider router={router}></RouterProvider>
          <Toaster position="top-center" />
          </Suspense>
          </I18nextProvider>
        </ThemeProvider> 
      </PersistGate>
    </Provider>
  </StrictMode>,
)
