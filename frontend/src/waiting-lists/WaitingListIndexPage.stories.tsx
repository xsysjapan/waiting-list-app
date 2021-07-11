import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router";
import WaitingListIndexPage from "./WaitingListIndexPage";

export default {
  component: WaitingListIndexPage,
  title: "waiting-lists/WaitingListIndexPage",
} as Meta;

const Template: Story = (args) => <WaitingListIndexPage {...args} />;

export const Index = Template.bind({});
Index.decorators = [
  (story) => (
    <MemoryRouter
      initialEntries={[{ pathname: "/waiting-lists" }]}
      initialIndex={0}
    >
      {story()}
    </MemoryRouter>
  ),
];

export const Create = Template.bind({});
Create.decorators = [
  (story) => (
    <MemoryRouter
      initialEntries={[{ pathname: "/waiting-lists/create" }]}
      initialIndex={0}
    >
      {story()}
    </MemoryRouter>
  ),
];

export const Details = Template.bind({});
Details.decorators = [
  (story) => (
    <MemoryRouter
      initialEntries={[{ pathname: "/waiting-lists/id" }]}
      initialIndex={0}
    >
      {story()}
    </MemoryRouter>
  ),
];
