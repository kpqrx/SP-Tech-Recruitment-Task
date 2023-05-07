import ConfiguratorForms from "@/components/molecules/ConfiguratorForms/ConfiguratorForms"
import { useState } from "react"
import styled from "styled-components"

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.color.gray[200]};
  color: ${({ theme }) => theme.color.black};
  font-size: ${({ theme }) => theme.fontSize.md};
  padding: ${({ theme }) => theme.spacing("md", "lg")};
`

function App() {
  const [count, setCount] = useState(0)

  const handleClick = async () => {
    const response = await fetch("/api/services")
    const data = await response.json()
    console.log({ data })
  }

  return (
    <div>
      <h1>Vite + React</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the Vite and React logos to learn more</p>
      <StyledButton onClick={handleClick}>Styled button</StyledButton>
      <ConfiguratorForms.Services
        stepNumber={1}
        label="Asdf"
      />
    </div>
  )
}

export default App
