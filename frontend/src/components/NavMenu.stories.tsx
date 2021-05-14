import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { NavMenu, NavMenuProps } from "./NavMenu";

export default {
  component: NavMenu,
  title: "components/NavMenu",
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<NavMenuProps> = (args) => <NavMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "children",
};
