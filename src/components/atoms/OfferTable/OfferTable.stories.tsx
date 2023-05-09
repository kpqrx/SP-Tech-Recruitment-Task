import type { Meta, StoryObj } from "@storybook/react"

import OfferTable from "./OfferTable"

const meta: Meta<typeof OfferTable> = {
  title: "Components/Atoms/OfferTable",
  component: OfferTable,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof OfferTable>

export const Default: Story = {
  args: {
    periods: [2023, 2024, 2025],
    monthlyFees: [100, 200, 300],
    packages: [
      { label: "Package 1", price: [10, 20, 30] },
      { label: "Package 2", price: [20, 20, 30] },
      { label: "Package 3", price: [30, 20, 30] },
    ],
  },
}
