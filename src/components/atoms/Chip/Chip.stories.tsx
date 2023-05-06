import type { Meta, StoryObj } from "@storybook/react"

import Chip from "./Chip"

const meta: Meta<typeof Chip> = {
  title: "Components/Atoms/Chip",
  component: Chip,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = {
  args: {
    children: "Chip",
  },
}
