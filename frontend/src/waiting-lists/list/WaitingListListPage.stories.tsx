import { Story, Meta } from "@storybook/react";
import {
  WaitingListListPageView,
  WaitingListListPageViewProps,
} from "./WaitingListListPage";

export default {
  component: WaitingListListPageView,
  title: "waiting-lists/list/WaitingListListPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<WaitingListListPageViewProps> = (args) => (
  <WaitingListListPageView {...args} />
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
  waitingLists: {
    page: 1,
    perPage: 10,
    totalCount: 0,
    list: [],
  },
};

export const withActiveInactive = Template.bind({});
withActiveInactive.args = {
  waitingListsStatus: "SUCCEEDED",
  waitingLists: {
    page: 1,
    perPage: 10,
    totalCount: 2,
    list: [
      { ...waitingList, id: "id1", active: false },
      { ...waitingList, id: "id2", active: true },
    ],
  },
};

export const withLoading = Template.bind({});
withLoading.args = {
  waitingListsStatus: "LOADING",
  waitingLists: {
    page: 1,
    perPage: 10,
    totalCount: 1,
    list: [waitingList],
  },
};
