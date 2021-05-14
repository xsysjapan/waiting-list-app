import { Story, Meta } from "@storybook/react";
import { Layout, LayoutProps } from "./Layout";

export default {
  component: Layout,
  title: "components/Layout",
} as Meta;

const Template: Story<LayoutProps> = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "children",
};
