import {
  StyledContainer,
  StyledThumb,
  StyledThumbWrapper,
  StyledTooltip,
  StyledTrack,
  StyledProgress,
} from "@/components/molecules/Slider/Slider.styled"
import type { SliderProps } from "@/components/molecules/Slider/Slider.types"
import { useCallback, useEffect, useRef } from "react"
import type { KeyboardEventHandler } from "react"
import $t from "~/translations.json"

function Slider(props: SliderProps) {
  const { values, value, minValue = 0, onChange, ...restProps } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const newValue = useRef(minValue)
  const stepWidth = useRef(0)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--x",
        `${
          (containerRef.current.clientWidth / (values.length - 1)) *
          (value - minValue)
        }px`
      )

      stepWidth.current = containerRef.current.clientWidth / (values.length - 1)
    }
  })

  const handlePointerDown = () => {
    function handlePointerMove(event: PointerEvent) {
      if (!containerRef.current) {
        return
      }
      const { clientX, movementX } = event
      const stepsCount = values.length - 1
      const { width: containerWidth, left: containerLeft } =
        containerRef.current.getBoundingClientRect()
      const isMovingRight = Math.min(Math.max(movementX, -4), 4) > 0

      stepWidth.current = containerWidth / stepsCount
      newValue.current = Math.min(
        Math.max(Math.round((clientX - containerLeft) / stepWidth.current), 0),
        stepsCount
      )

      const newPosition = Math.min(
        Math.max(clientX - containerLeft, 0),
        containerWidth
      )

      const currentProgress =
        stepWidth.current * Math.floor(newPosition / stepWidth.current)
      const shouldSnap = isMovingRight
        ? newPosition >= currentProgress + stepWidth.current * 0.85
        : newPosition <= currentProgress + stepWidth.current * 0.15

      containerRef.current.style.setProperty(
        "--x",
        `${shouldSnap ? newValue.current * stepWidth.current : newPosition}px`
      )
      if (shouldSnap) {
        onChange(newValue.current + minValue)
      }
    }

    function handlePointerUp() {
      if (!containerRef.current) {
        return
      }

      containerRef.current.style.setProperty(
        "--x",
        `${newValue.current * stepWidth.current}px`
      )
      onChange(newValue.current + minValue)
      document.removeEventListener("pointermove", handlePointerMove)
    }

    document.addEventListener("pointermove", handlePointerMove)
    document.addEventListener("pointerup", handlePointerUp)
  }

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!containerRef.current) {
      return
    }

    const ARROW_LEFT = "ArrowLeft"
    const ARROW_RIGHT = "ArrowRight"

    const { key } = event

    const isInvalidKey = ![ARROW_LEFT, ARROW_RIGHT].includes(key)
    const isEdgeValue =
      (key === ARROW_LEFT && value === minValue) ||
      (key === ARROW_RIGHT && value === values.length)

    if (isInvalidKey || isEdgeValue) {
      return
    }

    newValue.current = newValue.current + (key === ARROW_RIGHT ? 1 : -1)

    onChange(newValue.current + minValue)
    containerRef.current.style.setProperty(
      "--x",
      `${newValue.current * stepWidth.current}px`
    )
  }

  return (
    <StyledContainer
      ref={containerRef}
      {...restProps}
    >
      <StyledTrack>
        <StyledProgress />
      </StyledTrack>
      <StyledThumbWrapper onPointerDown={handlePointerDown}>
        <StyledThumb
          tabIndex={0}
          onKeyDown={handleKeyDown}
        />
        {value > minValue && (
          <StyledTooltip
            label={$t.to}
            origin="right"
          >
            {values[value - minValue]}
          </StyledTooltip>
        )}
      </StyledThumbWrapper>
      <StyledTooltip label={$t.from}>{values[0]}</StyledTooltip>
    </StyledContainer>
  )
}

export default Slider
