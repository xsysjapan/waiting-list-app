import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { Layout, LayoutProps } from "./Layout";

export default {
  component: Layout,
  title: "components/Layout",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<LayoutProps> = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "children",
};
