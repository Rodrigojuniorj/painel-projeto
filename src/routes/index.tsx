import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Dashboard } from '../Screens/Dashboard'
import { Planta } from '../Screens/Planta'

export function Router() {
  return (
    <Routes>
      <Route path="/paineladm" element={<DefaultLayout />}>
        <Route path="/paineladm" element={<Dashboard />} />
        <Route path="/paineladm/plantas" element={<Planta />} />
      </Route>
    </Routes>
  )
}
