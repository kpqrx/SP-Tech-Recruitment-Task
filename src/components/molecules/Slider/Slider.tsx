import {
  StyledContainer,
  StyledThumb,
  StyledThumbWrapper,
  StyledTooltip,
  StyledTrack,
  StyledProgress,
} from "@/components/molecules/Slider/Slider.styled"
import type { SliderProps } from "@/components/molecules/Slider/Slider.types"
import { useMotionValue } from "framer-motion"
import { useCallback, useEffect, useRef } from "react"

function Slider(props: SliderProps) {
  const { values, value, minValue = 0, onChange, ...restProps } = props
  const containerRef = useRef<HTMLDivElement>(null)

  let newValue: number, stepWidth: number

  const position = useMotionValue(0)

  useEffect(() => {
    if (containerRef.current) {
      position.set(
        (containerRef.current.clientWidth / (values.length - 1)) *
          (value - minValue)
      )
    }
  })

  const handlePointerDown = useCallback(() => {
    function handlePointerMove(event: PointerEvent) {
      if (!containerRef.current) {
        return
      }
      const { clientX, movementX } = event
      const stepsCount = values.length - 1
      const { width: containerWidth, left: containerLeft } =
        containerRef.current.getBoundingClientRect()
      const isMovingRight = Math.min(Math.max(movementX, -4), 4) > 0

      stepWidth = containerWidth / stepsCount
      newValue = Math.min(
        Math.max(Math.round((clientX - containerLeft) / stepWidth), 0),
        stepsCount
      )

      const newPosition = Math.min(
        Math.max(clientX - containerLeft, 0),
        containerWidth
      )
      const currentProgress = stepWidth * Math.floor(newPosition / stepWidth)
      const shouldSnap = isMovingRight
        ? newPosition >= currentProgress + stepWidth * 0.85
        : newPosition <= currentProgress + stepWidth * 0.15

      onChange(newValue + minValue)
      position.set(shouldSnap ? newValue * stepWidth : newPosition)
    }

    function handlePointerUp() {
      position.set(newValue * stepWidth)
      document.removeEventListener("pointermove", handlePointerMove)
    }

    document.addEventListener("pointermove", handlePointerMove)
    document.addEventListener("pointerup", handlePointerUp)
  }, [])

  return (
    <StyledContainer
      ref={containerRef}
      {...restProps}
    >
      <StyledTrack>
        <StyledProgress style={{ x: position }} />
      </StyledTrack>
      <StyledThumbWrapper
        onPointerDown={handlePointerDown}
        style={{ x: position }}
      >
        <StyledThumb />
        {value > minValue && (
          <StyledTooltip
            label="Do"
            origin="right"
          >
            {values[value - minValue]}
          </StyledTooltip>
        )}
      </StyledThumbWrapper>
      <StyledTooltip label="Od">{values[0]}</StyledTooltip>
    </StyledContainer>
  )
}

export default Slider
