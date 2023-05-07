/* eslint-disable */
// @ts-nocheck
// TODO: fix typings
import type { Meta, StoryObj } from "@storybook/react"

import ConfiguratorForms from "./ConfiguratorForms"
import { handlers } from "@/mocks/api"
import type { ConfiguratorFormsBaseProps } from "./ConfiguratorForms.types"

const meta: Meta<typeof ConfiguratorForms> = {
  title: "Components/Molecules/ConfiguratorForms",
  component: ConfiguratorForms,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ConfiguratorForms>

export const Services: Story = {
  render: (props: ConfiguratorFormsBaseProps) => (
    <ConfiguratorForms.Services {...props} />
  ),
  args: {
    label: "Configurator Services Form",
    stepNumber: 1,
  },
}

Services.parameters = {
  msw: {
    handlers,
  },
}
