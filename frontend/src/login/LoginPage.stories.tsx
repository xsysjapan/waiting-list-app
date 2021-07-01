import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { LoginPage, LoginPageProps } from "./LoginPage";

export default {
  component: LoginPage,
  title: "login/LoginPage",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<LoginPageProps> = (args) => <LoginPage {...args} />;

export const Default = Template.bind({});
