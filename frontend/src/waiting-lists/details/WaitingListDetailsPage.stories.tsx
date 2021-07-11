import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router";
import WaitingListDetailsPage from "./WaitingListDetailsPage";

export default {
  component: WaitingListDetailsPage,
  title: "waiting-lists/details/WaitingListDetailsPage",
} as Meta;

const Template: Story = (args) => <WaitingListDetailsPage {...args} />;

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

export const Edit = Template.bind({});
Edit.decorators = [
  (story) => (
    <MemoryRouter
      initialEntries={[{ pathname: "/waiting-lists/id/edit" }]}
      initialIndex={0}
    >
      {story()}
    </MemoryRouter>
  ),
];

export const AddCustomer = Template.bind({});
AddCustomer.decorators = [
  (story) => (
    <MemoryRouter
      initialEntries={[{ pathname: "/waiting-lists/id/customers/add" }]}
      initialIndex={0}
    >
      {story()}
    </MemoryRouter>
  ),
];

export const EditCustomer = Template.bind({});
EditCustomer.decorators = [
  (story) => (
    <MemoryRouter
      initialEntries={[{ pathname: "/waiting-lists/id/customers/cid/edit" }]}
      initialIndex={0}
    >
      {story()}
    </MemoryRouter>
  ),
];
