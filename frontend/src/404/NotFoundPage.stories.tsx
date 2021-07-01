import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { NotFoundPage, NotFoundPageProps } from "./NotFoundPage";

export default {
  component: NotFoundPage,
  title: "404/NotFoundPage",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<NotFoundPageProps> = (args) => <NotFoundPage {...args} />;

export const Default = Template.bind({});
