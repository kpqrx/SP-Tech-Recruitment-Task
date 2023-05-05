import type { Meta, StoryObj } from "@storybook/react";

import Tooltip from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  args: {
    children: "Tooltip",
    origin: "left",
  },
};

export const Secondary: Story = {
  args: {
    children: "Tooltip",
    origin: "right",
  },
};
