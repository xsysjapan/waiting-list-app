import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { WaitingList, WaitingListProps } from "./WaitingList";

export default {
  component: WaitingList,
  title: "components/WaitingList",
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<WaitingListProps> = (args) => <WaitingList {...args} />;

export const Default = Template.bind({});
Default.args = {
  waitings: [
    {
      id: 1,
      date: "2021-05-24",
      number: 1,
      customer: {
        id: 1,
        name: "Customer 1",
        phoneNumber: "090-1111-1111",
      },
    },
  ],
};
