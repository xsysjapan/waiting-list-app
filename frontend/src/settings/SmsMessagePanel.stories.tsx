import { Story, Meta } from "@storybook/react";
import { SmsMessagePanel, SmsMessagePanelProps } from "./SmsMessagePanel";

export default {
  component: SmsMessagePanel,
  title: "settings/SmsMessagePanel",
} as Meta;

const Template: Story<SmsMessagePanelProps> = (args) => (
  <SmsMessagePanel {...args} />
);

export const Default = Template.bind({});

export const withError = Template.bind({});
withError.args = {
  error: "Error message.",
};

export const withLoading = Template.bind({});
withLoading.args = {
  state: "LOADING",
};
