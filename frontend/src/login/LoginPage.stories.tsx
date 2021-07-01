import { Story, Meta } from "@storybook/react";
import { LoginPage, LoginPageProps } from "./LoginPage";

export default {
  component: LoginPage,
  title: "login/LoginPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<LoginPageProps> = (args) => <LoginPage {...args} />;

export const Default = Template.bind({});
