import { Story, Meta } from "@storybook/react";
import { HomePage, HomePageProps } from "./HomePage";

export default {
  component: HomePage,
  title: "home/HomePage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<HomePageProps> = (args) => <HomePage {...args} />;

export const Default = Template.bind({});
