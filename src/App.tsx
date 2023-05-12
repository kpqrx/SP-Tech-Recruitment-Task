import OfferConfigurator from "@/components/organisms/OfferConfigurator"
import styled from "styled-components"

const StyledContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing("md")};
`

function App() {
  return (
    <StyledContainer>
      <OfferConfigurator />
    </StyledContainer>
  )
}

export default App
