import { Story, Meta } from "@storybook/react";
import { WaitingListForm, WaitingListFormProps } from "./WaitingListForm";

export default {
  component: WaitingListForm,
  title: "waiting-lists/WaitingListForm",
} as Meta;

const Template: Story<WaitingListFormProps> = (args) => (
  <WaitingListForm {...args} />
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
