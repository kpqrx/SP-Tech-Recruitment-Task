import styled from "styled-components"

export const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: minmax(auto, 296px) auto;
  border-radius: ${({ theme }) => theme.radii.md};
  width: 100%;
  overflow: hidden;
`

export const StyledStepsWrapper = styled.div`
  display: none;
  background-color: ${({ theme }) => theme.color.gray[400]};
  padding: ${({ theme }) => theme.spacing("md")} 0;

  @media screen and (min-width: 1024px) {
    display: flex;
    flex-flow: column;
    grid-area: 1 / 1 / 2 / 2;
  }
`

export const StyledViewWrapper = styled.form`
  grid-area: 1 / 1 / 2 / 3;
  min-height: 436px;
  background-color: ${({ theme }) => theme.color.gray[100]};
  padding: ${({ theme }) => theme.spacing("md", "lg")};

  @media screen and (min-width: 1024px) {
    grid-area: 1 / 2 / 2 / 3;

    padding: ${({ theme }) => theme.spacing("lg", "xl")};
  }
`

export const StyledContextualWrapper = styled.div`
  display: flex;
  justify-content: center;
  grid-area: 2 / 1 / 3 / 2;
  background-color: ${({ theme }) => theme.color.gray[300]};
  padding: ${({ theme }) => theme.spacing("md", "xl")};
`

export const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-area: 2 / 2 / 3 / 3;
  background-color: ${({ theme }) => theme.color.gray[300]};
  padding: ${({ theme }) => theme.spacing("md", "xl")};

  @media screen and (min-width: 1024px) {
    justify-content: flex-start;
  }
`
