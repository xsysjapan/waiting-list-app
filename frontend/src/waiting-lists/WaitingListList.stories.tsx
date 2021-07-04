import { Story, Meta } from "@storybook/react";
import { WaitingListList, WaitingListListProps } from "./WaitingListList";

export default {
  component: WaitingListList,
  title: "waiting-lists/WaitingListList",
} as Meta;

const Template: Story<WaitingListListProps> = (args) => (
  <WaitingListList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  waitingLists: [
    {
      id: "id",
      name: "2021-05-24",
      active: false,
    },
  ],
};

export const MultipleLines = Template.bind({});
MultipleLines.args = {
  waitingLists: [
    {
      id: "id1",
      name: "2021-05-24 1",
      active: false,
    },
    {
      id: "id2",
      name: "2021-05-24 2",
      active: false,
    },
  ],
};
