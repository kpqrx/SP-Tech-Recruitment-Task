import type { Meta, StoryObj } from "@storybook/react"

import ServiceTile from "./ServiceTile"

const meta: Meta<typeof ServiceTile> = {
  title: "Components/Atoms/ServiceTile",
  component: ServiceTile,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ServiceTile>

export const Default: Story = {
  args: {
    label: "Default Service Tile",
    price: 39,
  },
}

export const Disabled: Story = {
  args: {
    label: "Disabled Service Tile",
    price: 49,
    disabled: true,
  },
}

export const Checked: Story = {
  args: {
    label: "Disabled Service Tile",
    price: 59,
    defaultChecked: true,
  },
}
