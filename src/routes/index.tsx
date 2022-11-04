import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { LoginLayout } from '../layouts/LoginLayout'
import { Dashboard } from '../Screens/Dashboard'
import { Login } from '../Screens/Login'
import { Planta } from '../Screens/Planta'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginLayout />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route path="/paineladm" element={<DefaultLayout />}>
        <Route path="/paineladm" element={<Dashboard />} />
        <Route path="/paineladm/plantas" element={<Planta />} />
      </Route>
    </Routes>
  )
}
