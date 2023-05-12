import styled, { css } from "styled-components"
import Tooltip from "@/components/atoms/Tooltip"

export const StyledContainer = styled.div`
  position: relative;

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.color.orange[300]};
    outline-offset: ${({ theme }) => theme.spacing("sm")};
    border-radius: ${({ theme }) => theme.radii.sm};
  }
`

export const StyledTrack = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.gray[300]};
  position: relative;
  z-index: 0;
  overflow: hidden;
  position: all;
`

export const StyledProgress = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  transition: transform 0.1s ease;
  transform-origin: left;
  background-color: ${({ theme }) => theme.color.orange[200]};
  transform: translateX(var(--x));
`

export const StyledThumbWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column;
  gap: 8px;
  left: -12px;
  top: -8px;
  transition: transform 0.125s ease;
  transform: translateX(var(--x));
`

export const StyledTooltip = styled(Tooltip)`
  position: absolute;
  top: ${({ theme }) => theme.spacing("md")};

  ${({ origin }) =>
    origin === "left" &&
    css`
      left: 0;
    `}

  ${({ origin }) =>
    origin === "right" &&
    css`
      right: calc(100% - 12px);
      transform: translateY(${({ theme }) => theme.spacing("xs")});
    `}
`

export const StyledThumb = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray[400]};
  position: relative;
  inset: 0;
  z-index: 1;
  outline: none;

  ${StyledTooltip} {
    position: relative;
  }
`
