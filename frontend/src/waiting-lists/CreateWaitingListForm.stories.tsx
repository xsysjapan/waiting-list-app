import { Story, Meta } from "@storybook/react";
import {
  CreateWaitingListForm,
  CreateWaitingListFormProps,
} from "./CreateWaitingListForm";

export default {
  component: CreateWaitingListForm,
  title: "waiting-lists/CreateWaitingListForm",
} as Meta;

const Template: Story<CreateWaitingListFormProps> = (args) => (
  <CreateWaitingListForm {...args} />
);

export const Default = Template.bind({});
