import {
  AggregateCommandHandler,
  CommandBus,
  EventStore,
  InMemoryEventStorage,
} from "node-cqrs";
import { UserAggregate } from "./domain/UserAggregate";
import { UsersProjection } from "./eventHandlers/UsersProjection";

const createBaseInstances = () => {
  const storage = new InMemoryEventStorage();
  const eventStore = new EventStore({ storage }) as unknown as IEventStore;
  const commandBus = new CommandBus();

  const aggregateType = UserAggregate;

  const userCommandHandler = new AggregateCommandHandler({
    eventStore,
    aggregateType,
  });
  userCommandHandler.subscribe(commandBus);

  const usersProjection = new UsersProjection();
  usersProjection.subscribe(eventStore);

  return {
    eventStore,
    commandBus,
    users: usersProjection.view,
  };
};

const instances = createBaseInstances();
export default instances;
