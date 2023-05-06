import type { Meta, StoryObj } from "@storybook/react";

import ServiceTile from "./ServiceTile";

const meta: Meta<typeof ServiceTile> = {
  title: "Components/Atoms/ServiceTile",
  component: ServiceTile,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ServiceTile>;

export const Primary: Story = {
  args: {
    label: "Primary Service Tile",
    price: 39,
  },
};

export const Disabled: Story = {
  args: {
    label: "Secondary Service Tile",
    price: 49,
    disabled: true,
  },
};
