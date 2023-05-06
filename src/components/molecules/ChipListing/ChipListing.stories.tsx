import type { Meta, StoryObj } from "@storybook/react"

import ChipListing from "./ChipListing"

const meta: Meta<typeof ChipListing> = {
  title: "Components/Molecules/ChipListing",
  component: ChipListing,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ChipListing>

export const Default: Story = {
  args: {
    label: "Chips listing:",
    chips: ["Lorem", "ipsum", "dolor", "sit", "amet"],
  },
}
