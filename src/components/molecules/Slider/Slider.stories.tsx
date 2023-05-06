import type { Meta, StoryObj } from "@storybook/react"
import { useArgs } from "@storybook/preview-api"

import Slider from "./Slider"

const meta: Meta<typeof Slider> = {
  title: "Components/Molecules/Slider",
  component: Slider,
  tags: ["autodocs"],
  decorators: [
    function Component(Story, ctx) {
      const [, setArgs] = useArgs<typeof ctx.args>()

      const onChange = (value: number) => {
        ctx.args.onChange?.(value)

        // Check if the component is controlled
        if (typeof ctx.args.value !== undefined) {
          setArgs({ value })
        }
      }

      return <Story args={{ ...ctx.args, onChange }} />
    },
  ],
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: {
    steps: [2023, 2024, 2025],
  },
}
