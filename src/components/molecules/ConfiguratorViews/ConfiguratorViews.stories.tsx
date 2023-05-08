/* eslint-disable */
// @ts-nocheck
// TODO: fix typings
import type { Meta, StoryObj } from "@storybook/react"

import ConfiguratorViews from "./ConfiguratorViews"
import { handlers } from "@/mocks/api"
import type { ConfiguratorViewsBaseProps } from "./ConfiguratorViews.types"

const meta: Meta<typeof ConfiguratorViews> = {
  title: "Components/Molecules/ConfiguratorViews",
  component: ConfiguratorViews,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ConfiguratorViews>

export const Services: Story = {
  render: (props: ConfiguratorViewsBaseProps) => (
    <ConfiguratorViews.Services {...props} />
  ),
  args: {
    label: "Configurator Services View",
    stepNumber: 1,
  },
}

export const ContractPeriod: Story = {
  render: (props: ConfiguratorViewsBaseProps) => (
    <ConfiguratorViews.ContractPeriod {...props} />
  ),
  args: {
    label: "Configurator ContractPeriod View",
    stepNumber: 1,
  },
}

Services.parameters = {
  msw: {
    handlers,
  },
}
