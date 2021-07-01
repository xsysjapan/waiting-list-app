import { Story, Meta } from "@storybook/react";
import { NavMenu, NavMenuProps } from "./NavMenu";

export default {
  component: NavMenu,
  title: "shared/NavMenu",
} as Meta;

const Template: Story<NavMenuProps> = (args) => <NavMenu {...args} />;

export const Default = Template.bind({});

export const withUser = Template.bind({});
withUser.args = {
  user: {
    username: "admin",
    name: "管理者",
  },
};
