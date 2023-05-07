import type { Meta, StoryObj } from "@storybook/react"

import OfferConfigurator from "./OfferConfigurator"
import { handlers } from "@/mocks/api"

const meta: Meta<typeof OfferConfigurator> = {
  title: "Components/Organisms/OfferConfigurator",
  component: OfferConfigurator,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof OfferConfigurator>

export const Default: Story = {
  args: {
    children: "OfferConfigurator",
  },
}

Default.parameters = {
  msw: {
    handlers,
  },
}
