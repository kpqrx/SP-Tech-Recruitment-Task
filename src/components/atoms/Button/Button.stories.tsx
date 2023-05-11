import type { Meta, StoryObj } from "@storybook/react"

import Button from "./Button"

const meta: Meta<typeof Button> = {
  title: "Components/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: "Primary button",
    variant: "primary",
  },
}

export const Secondary: Story = {
  args: {
    children: "Secondary button",
    variant: "secondary",
  },
}

export const Tertiary: Story = {
  args: {
    children: "Tertiary button",
    variant: "tertiary",
  },
}
