import { AbstractProjection } from "node-cqrs";
import { UserCreatedEvent } from "../events";

export class UsersProjection extends AbstractProjection {
  static get handles() {
    return ["userCreated"];
  }

  async userCreated(event: UserCreatedEvent) {
    const { aggregateId, payload } = event;
    await this.view.create(aggregateId, {
      id: String(aggregateId),
      username: payload.username,
      name: payload.name,
    });
  }
}
