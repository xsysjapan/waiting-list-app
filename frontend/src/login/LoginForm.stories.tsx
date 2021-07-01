import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { LoginForm, LoginFormProps } from "./LoginForm";

export default {
  component: LoginForm,
  title: "login/LoginForm",
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<LoginFormProps> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
