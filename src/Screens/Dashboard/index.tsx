import { Box } from '../../components/Box'
import { DashBoardContainer } from './styles'

export function Dashboard() {
  return (
    <>
      <h2>Dashboard</h2>
      <DashBoardContainer>
        <Box size={2}>
          <h2>Usuários Mensais</h2>
          <p>1205</p>
        </Box>
        <Box size={2}>
          <h2>Usuários Diários</h2>
          <p>467</p>
        </Box>
        <Box size={1}>
          <h3>Estatisticas</h3>
        </Box>
      </DashBoardContainer>
    </>
  )
}
