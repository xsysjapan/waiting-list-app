import { Story, Meta } from "@storybook/react";
import {
  WaitingListCustomerListItem,
  WaitingListCustomerListItemProps,
} from "./WaitingListCustomerListItem";

export default {
  component: WaitingListCustomerListItem,
  title: "waiting-lists/details/WaitingListCustomerListItem",
} as Meta;

const Template: Story<WaitingListCustomerListItemProps> = (args) => (
  <WaitingListCustomerListItem {...args} />
);

const defaultCustomer = {
  id: "id",
  name: "Customer Name",
  phoneNumber: "09012345678",
  status: "NOT_CALLED" as "NOT_CALLED" | "CALLING" | "ARRIVED",
};

export const withNormalAndNotCalledState = Template.bind({});
withNormalAndNotCalledState.args = {
  customer: {
    ...defaultCustomer,
    status: "NOT_CALLED",
  },
  number: 1,
};

export const withRemarks = Template.bind({});
withRemarks.args = {
  customer: {
    ...defaultCustomer,
    remarks:
      "あいつは事実現にこういう換言院というのの時に過ぎですな。ほとんど事実へ演説方はたといその解剖ないただけにするからいるますがも講演生れなかっませから、こうにもするないですんなら。そのうち岡田さんを関係自己当然希望でいうある先生その党派あなたか講演でといったお話ただましたで、その事実は何か日本人手伝いが足りから、大森君のものに国家のそれに至極ご啓発ときからそれ家来がお通用に使いようにどうもご立脚が進んたですて、しかるにすでに意味をするないているでのに知れですです。",
  },
  number: 1,
};

export const withRemarksActive = Template.bind({});
withRemarksActive.args = {
  ...withRemarks.args,
  active: true,
};

export const withRemarksWithLF = Template.bind({});
withRemarksWithLF.args = {
  customer: {
    ...defaultCustomer,
    remarks: "line 1\nline2\rline3\r\nline4",
  },
  number: 1,
};

export const withRemarksWithLFActive = Template.bind({});
withRemarksWithLFActive.args = {
  ...withRemarksWithLF.args,
  active: true,
};

export const withNormalAndCallingState = Template.bind({});
withNormalAndCallingState.args = {
  customer: {
    ...defaultCustomer,
    status: "CALLING",
  },
  number: 1000,
};

export const withNormalAndArrivedState = Template.bind({});
withNormalAndArrivedState.args = {
  customer: {
    ...defaultCustomer,
    status: "ARRIVED",
  },
  number: 1,
};

export const withActiveAndNotCalledState = Template.bind({});
withActiveAndNotCalledState.args = {
  customer: {
    ...defaultCustomer,
    status: "NOT_CALLED",
  },
  number: 1,
  active: true,
};

export const withActiveAndCallingState = Template.bind({});
withActiveAndCallingState.args = {
  customer: {
    ...defaultCustomer,
    status: "CALLING",
  },
  number: 1,
  active: true,
};

export const withActiveAndArrivedState = Template.bind({});
withActiveAndArrivedState.args = {
  customer: {
    ...defaultCustomer,
    status: "ARRIVED",
  },
  number: 1,
  active: true,
};

export const withActiveAndIsFirst = Template.bind({});
withActiveAndIsFirst.args = {
  customer: {
    ...defaultCustomer,
  },
  number: 1,
  active: true,
  isFirst: true,
};

export const withActiveAndIsLast = Template.bind({});
withActiveAndIsLast.args = {
  customer: {
    ...defaultCustomer,
  },
  number: 1,
  active: true,
  isLast: true,
};

export const withActiveAndIsFirstAndLast = Template.bind({});
withActiveAndIsFirstAndLast.args = {
  customer: {
    ...defaultCustomer,
  },
  number: 1,
  active: true,
  isFirst: true,
  isLast: true,
};
