import { Story, Meta } from "@storybook/react";
import { SettingsPage, SettingsPageProps } from "./SettingsPage";

export default {
  component: SettingsPage,
  title: "settings/SettingsPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<SettingsPageProps> = (args) => <SettingsPage {...args} />;

export const Default = Template.bind({});
