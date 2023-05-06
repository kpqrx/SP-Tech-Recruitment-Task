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

  const handlePointerDown = useCallback((event: PointerEvent) => {
    const { ownerDocument } = event.currentTarget
    if (!ownerDocument) {
      return
    }

    function handlePointerMove(event: Event) {
      if (!containerRef.current) {
        return
      }
      const { clientX } = event
      const stepsCount = steps.length - 1
      const { width: containerWidth, left: containerLeft } =
        containerRef.current.getBoundingClientRect()

      const stepWidth = containerWidth / stepsCount
      const index = Math.min(
        Math.max(Math.round((clientX - containerLeft) / stepWidth), 0),
        stepsCount
      )
      const newPosition = index * stepWidth

      onChange(steps[index])
      setPosition(newPosition)
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
      <StyledTrack $progress={steps.indexOf(value) + 1 / steps.length} />
      <StyledThumbWrapper
        onPointerDown={handlePointerDown}
        animate={{
          x: position,
        }}
      >
        <StyledThumb />
        {position > 0 && <StyledTooltip origin="right">{value}</StyledTooltip>}
      </StyledThumbWrapper>
      <StyledTooltip>{steps[0]}</StyledTooltip>
    </StyledContainer>
  )
}

// TODO: fix typings, styling, UX
export default Slider
