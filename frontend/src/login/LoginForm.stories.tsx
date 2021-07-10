import { Story, Meta } from "@storybook/react";
import { LoginForm, LoginFormProps } from "./LoginForm";

export default {
  component: LoginForm,
  title: "login/LoginForm",
} as Meta;

const Template: Story<LoginFormProps> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});

export const withError = Template.bind({});
withError.args = {
  error: "Error message.",
};

export const withLoading = Template.bind({});
withLoading.args = {
  status: "LOADING",
};
