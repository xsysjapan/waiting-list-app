import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router";
import {
  CreateWaitingListForm,
  CreateWaitingListFormProps,
} from "./CreateWaitingListForm";

export default {
  component: CreateWaitingListForm,
  title: "components/CreateWaitingListForm",
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<CreateWaitingListFormProps> = (args) => (
  <CreateWaitingListForm {...args} />
);

export const Default = Template.bind({});
