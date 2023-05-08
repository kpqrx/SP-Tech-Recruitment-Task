/* eslint-disable */
// @ts-nocheck
// TODO: fix typings, styling, UX
import {
  StyledContainer,
  StyledThumb,
  StyledThumbWrapper,
  StyledTooltip,
  StyledTrack,
} from "@/components/molecules/Slider/Slider.styled"
import type { SliderProps } from "@/components/molecules/Slider/Slider.types"
import { useCallback, useRef, useState } from "react"

function Slider(props: SliderProps) {
  const { steps, value = steps[0], onChange, ...restProps } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(0)
  const [isOnStep, setIsOnStep] = useState(true)

  const handlePointerDown = useCallback((event: PointerEvent) => {
    const { ownerDocument } = event.currentTarget
    if (!ownerDocument) {
      return
    }

    function handlePointerMove(event: Event) {
      if (!containerRef.current) {
        return
      }
      const { clientX, movementX } = event
      const stepsCount = steps.length - 1
      const { width: containerWidth, left: containerLeft } =
        containerRef.current.getBoundingClientRect()
      const isMovingRight = Math.min(Math.max(movementX, -4), 4) > 0

      const stepWidth = containerWidth / stepsCount
      const index = Math.min(
        Math.max(Math.round((clientX - containerLeft) / stepWidth), 0),
        stepsCount
      )

      const newPosition = Math.min(
        Math.max(clientX - containerLeft, 0),
        containerWidth
      )

      onChange(steps[index])
      setPosition(() => {
        const currentProgress = stepWidth * Math.floor(newPosition / stepWidth)
        const shouldSnap = isMovingRight
          ? newPosition >= currentProgress + stepWidth * 0.5
          : newPosition <= currentProgress + stepWidth * 0.5
        return shouldSnap ? index * stepWidth : newPosition
      })
    }

    function handlePointerUp(event: Event) {
      ownerDocument.removeEventListener("pointermove", handlePointerMove)
    }

    ownerDocument.addEventListener("pointermove", handlePointerMove)
    ownerDocument.addEventListener("pointerup", handlePointerUp)
  }, [])

  return (
    <StyledContainer
      ref={containerRef}
      {...restProps}
    >
      <StyledTrack style={{ "--current-position": `${position}px` }} />
      <StyledThumbWrapper
        onPointerDown={handlePointerDown}
        style={{ x: position }}
      >
        <StyledThumb />
        {position > 0 && (
          <StyledTooltip
            label="Do"
            origin="right"
          >
            {value}
          </StyledTooltip>
        )}
      </StyledThumbWrapper>
      <StyledTooltip label="Od">{steps[0]}</StyledTooltip>
    </StyledContainer>
  )
}

export default Slider
