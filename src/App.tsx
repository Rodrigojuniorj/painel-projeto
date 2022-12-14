import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Router } from './routes'
import { ToastContainer } from 'react-toastify'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
        </BrowserRouter>
      <GlobalStyle />
      <ToastContainer />
    </ThemeProvider>
  )
}
