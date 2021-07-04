import { Story, Meta } from "@storybook/react";
import {
  WaitingListIndexPageView,
  WaitingListIndexPageViewProps,
} from "./WaitingListIndexPage";

export default {
  component: WaitingListIndexPageView,
  title: "waiting-lists/WaitingListIndexPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<WaitingListIndexPageViewProps> = (args) => (
  <WaitingListIndexPageView {...args} />
);

const waitingList = {
  id: "wl",
  name: "Waiting List",
  active: false,
  customers: [],
};

export const Empty = Template.bind({});
Empty.args = {
  waitingListsStatus: "SUCCEEDED",
  waitingLists: [],
};

export const withActiveInactive = Template.bind({});
withActiveInactive.args = {
  waitingListsStatus: "SUCCEEDED",
  waitingLists: [
    { ...waitingList, id: "id1", active: false },
    { ...waitingList, id: "id2", active: true },
  ],
};

export const withLoading = Template.bind({});
withLoading.args = {
  waitingListsStatus: "LOADING",
  waitingLists: [waitingList],
};

