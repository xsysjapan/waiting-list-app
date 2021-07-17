import { Story, Meta } from "@storybook/react";
import { Pager, PagerProps } from "./Pager";

export default {
  component: Pager,
  title: "shared/Pager",
} as Meta;

const Template: Story<PagerProps> = (args) => <Pager {...args} />;

export const Default = Template.bind({});
Default.args = {
  url: "/test",
  totalCount: 0,
  page: 1,
  perPage: 10,
};

export const withCount1 = Template.bind({});
withCount1.args = {
  ...Default.args,
  totalCount: 1,
};

export const withCount10 = Template.bind({});
withCount10.args = {
  ...Default.args,
  totalCount: 10,
};

export const withCount11 = Template.bind({});
withCount11.args = {
  ...Default.args,
  totalCount: 11,
};

export const withCount11Page2 = Template.bind({});
withCount11Page2.args = {
  ...withCount11.args,
  page: 2,
};

export const withCount100 = Template.bind({});
withCount100.args = {
  ...Default.args,
  totalCount: 100,
};

export const withCount100Page2 = Template.bind({});
withCount100Page2.args = {
  ...withCount100.args,
  page: 2,
};

export const withCount100Page3 = Template.bind({});
withCount100Page3.args = {
  ...withCount100.args,
  page: 3,
};

export const withCount100Page4 = Template.bind({});
withCount100Page4.args = {
  ...withCount100.args,
  page: 4,
};

export const withCount100Page5 = Template.bind({});
withCount100Page5.args = {
  ...withCount100.args,
  page: 5,
};

export const withCount100Page6 = Template.bind({});
withCount100Page6.args = {
  ...withCount100.args,
  page: 6,
};

export const withCount100Page7 = Template.bind({});
withCount100Page7.args = {
  ...withCount100.args,
  page: 7,
};

export const withCount100Page8 = Template.bind({});
withCount100Page8.args = {
  ...withCount100.args,
  page: 8,
};

export const withCount100Page9 = Template.bind({});
withCount100Page9.args = {
  ...withCount100.args,
  page: 9,
};

export const withCount100Page10 = Template.bind({});
withCount100Page10.args = {
  ...withCount100.args,
  page: 10,
};

export const withCount200 = Template.bind({});
withCount200.args = {
  ...Default.args,
  totalCount: 200,
};

export const withCount200Page5 = Template.bind({});
withCount200Page5.args = {
  ...withCount200.args,
  page: 5,
};

export const withCount200Page6 = Template.bind({});
withCount200Page6.args = {
  ...withCount200.args,
  page: 6,
};

export const withCount200Page14 = Template.bind({});
withCount200Page14.args = {
  ...withCount200.args,
  page: 14,
};

export const withCount200Page15 = Template.bind({});
withCount200Page15.args = {
  ...withCount200.args,
  page: 15,
};

export const withCount200Page16 = Template.bind({});
withCount200Page16.args = {
  ...withCount200.args,
  page: 16,
};

export const withCount200Page20 = Template.bind({});
withCount200Page20.args = {
  ...withCount200.args,
  page: 20,
};
