import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { HomePage, HomePageProps } from "./HomePage";

export default {
  component: HomePage,
  title: "pages/HomePage",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<HomePageProps> = (args) => <HomePage {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "children",
};
