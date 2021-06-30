import styled from '@emotion/styled'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <p>logo</p>
          <p>小明</p>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;
`
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`
const HeaderRight = styled.div``

const Main = styled.div`
  height: calc(100vh - 6rem);
`
