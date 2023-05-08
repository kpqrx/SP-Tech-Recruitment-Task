import type { Meta, StoryObj } from "@storybook/react"

import ViewContainer from "./ViewContainer"

const meta: Meta<typeof ViewContainer> = {
  title: "Components/Atoms/ViewContainer",
  component: ViewContainer,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ViewContainer>

export const Default: Story = {
  args: {
    children: "View container",
    renderButtons: () => "Main button",
    renderContextual: () => "Contextual button",
    renderSteps: () => "Steps here",
  },
}
