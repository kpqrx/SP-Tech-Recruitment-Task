import {
  StyledContainer,
  StyledThumb,
  StyledThumbWrapper,
  StyledTooltip,
  StyledTrack,
  StyledProgress,
} from "@/components/molecules/Slider/Slider.styled"
import type { SliderProps } from "@/components/molecules/Slider/Slider.types"
import { useEffect, useRef } from "react"
import type { KeyboardEvent, PointerEvent, MouseEvent } from "react"
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

    const handleSliderResize = () => {
      if (!containerRef.current) {
        return
      }

      stepWidth.current = containerRef.current.clientWidth / (values.length - 1)

      containerRef.current.style.setProperty(
        "--x",
        `${value + minValue * stepWidth.current}px`
      )
    }

    window.addEventListener("resize", handleSliderResize)

    return () => window.removeEventListener("resize", handleSliderResize)
  })

  const handleUpdateThumbPosition = (event: PointerEvent) => {
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

  const handleSetThumbPosition = (event: PointerEvent | MouseEvent) => {
    if (!containerRef.current) {
      return
    }

    if (event.currentTarget !== containerRef.current) {
      document.removeEventListener(
        "pointermove",
        handleUpdateThumbPosition as never
      )
      return
    }

    const { clientX } = event
    const { left: containerLeft } = containerRef.current.getBoundingClientRect()

    const stepsCount = values.length - 1
    newValue.current = Math.min(
      Math.max(Math.round((clientX - containerLeft) / stepWidth.current), 0),
      stepsCount
    )

    containerRef.current.style.setProperty(
      "--x",
      `${newValue.current * stepWidth.current}px`
    )
    onChange(newValue.current + minValue)
    document.removeEventListener(
      "pointermove",
      handleUpdateThumbPosition as never
    )
  }

  const handleThumbPositionInit = () => {
    document.addEventListener("pointermove", handleUpdateThumbPosition as never)
    document.addEventListener("pointerup", handleSetThumbPosition as never)
  }

  const handleThumbKeyDown = (event: KeyboardEvent) => {
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
      onClick={handleSetThumbPosition}
      {...restProps}
    >
      <StyledTrack>
        <StyledProgress />
      </StyledTrack>
      <StyledThumbWrapper onPointerDown={handleThumbPositionInit}>
        <StyledThumb
          tabIndex={0}
          onKeyDown={handleThumbKeyDown}
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
