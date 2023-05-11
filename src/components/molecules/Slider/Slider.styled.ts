import styled, { css } from "styled-components"
import { motion } from "framer-motion"
import Tooltip from "@/components/atoms/Tooltip"

export const StyledContainer = styled.div`
  position: relative;
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

export const StyledProgress = styled(motion.div)`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  transition: transform 0.1s ease;
  transform-origin: left;
  background-color: ${({ theme }) => theme.color.orange[200]};
`

export const StyledThumbWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-flow: column;
  gap: 8px;
  left: -12px;
  top: -8px;
  transition: transform 0.125s ease;
`

export const StyledTooltip = styled(Tooltip)`
  position: relative;
  top: ${({ theme }) => theme.spacing("sm")};

  ${({ origin }) =>
    origin === "left" &&
    css`
      left: 0;
    `}

  ${({ origin }) =>
    origin === "right" &&
    css`
      top: 0;
      right: calc(100% - 12px);
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

  ${StyledTooltip} {
    position: relative;
  }
`
