import React from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store, { persistor } from '../store'
import { GlobalStyle } from '../styles/global'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import NextNProgress from 'nextjs-progressbar'
import { darken } from 'polished'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextNProgress
          color={darken(0.1, '#0047FF')}
          options={{ showSpinner: false }}
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
        />
        <GlobalStyle />
        <Component {...pageProps} />
        <ToastContainer />
      </PersistGate>
    </Provider>
  )
}
export default MyApp
