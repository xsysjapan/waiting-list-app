import { Story, Meta } from "@storybook/react";
import { PassedTimeLabel, PassedTimeLabelProps } from "./PassedTimeLabel";

export default {
  component: PassedTimeLabel,
  title: "waiting-lists/details/PassedTimeLabel",
} as Meta;

const Template: Story<PassedTimeLabelProps> = (args) => (
  <PassedTimeLabel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  diffInSeconds: 0,
};
