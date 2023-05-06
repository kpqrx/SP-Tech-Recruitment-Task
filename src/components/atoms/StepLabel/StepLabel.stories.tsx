import type { Meta, StoryObj } from "@storybook/react"

import StepLabel from "./StepLabel"

const meta: Meta<typeof StepLabel> = {
  title: "Components/Atoms/StepLabel",
  component: StepLabel,
  tags: ["autodocs"],
  argTypes: {
    number: { control: { type: "number" } },
  },
  args: {
    number: 1,
  },
}

export default meta
type Story = StoryObj<typeof StepLabel>

export const StepInProgress: Story = {
  args: {
    children: "Step in progress",
    status: "inprogress",
  },
}

export const StepUpcomming: Story = {
  args: {
    children: "Upcomming step",
    status: "upcomming",
  },
}

export const StepCompleted: Story = {
  args: {
    children: "Step completed",
    status: "completed",
  },
}

export const StepWithoutStatus: Story = {
  args: {
    children: "Step without status",
  },
}
