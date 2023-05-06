import type { Meta, StoryObj } from "@storybook/react"

import FormContainer from "./FormContainer"

const meta: Meta<typeof FormContainer> = {
  title: "Components/Atoms/FormContainer",
  component: FormContainer,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof FormContainer>

export const Default: Story = {
  args: {
    children: "Form container",
    renderButtons: () => "Main button",
    renderContextual: () => "Contextual button",
    renderSteps: () => "Steps here",
  },
}
