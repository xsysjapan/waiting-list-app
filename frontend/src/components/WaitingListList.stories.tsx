import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { WaitingListList, WaitingListListProps } from "./WaitingListList";

export default {
  component: WaitingListList,
  title: "components/WaitingListList",
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
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
    },
  ],
};

export const MultipleLines = Template.bind({});
MultipleLines.args = {
  waitingLists: [
    {
      id: "id1",
      name: "2021-05-24 1",
    },
    {
      id: "id2",
      name: "2021-05-24 2",
    },
  ],
};
