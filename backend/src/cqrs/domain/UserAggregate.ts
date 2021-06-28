import { AbstractAggregate } from "node-cqrs";
import crypto from "crypto";
import { UserCreatedEvent, UserPasswordChangedEvent } from "../events";
import { ChangePasswordCommand, CreateUserCommand } from "../commands";

function md5Hash(data: string) {
  return crypto.createHash("md5").update(data).digest("hex");
}

class UserAggregateState {
  username!: string;
  name!: string;
  passwordHash!: string;

  userCreated(event: UserCreatedEvent): void {
    this.username = event.payload.username;
    this.name = event.payload.name;
    this.passwordHash = event.payload.passwordHash;
  }

  userPasswordChanged(event: UserPasswordChangedEvent) {
    this.passwordHash = event.payload.passwordHash;
  }
}

/**
 * User Aggregate - defines all user-related command handlers
 *
 * @class UserAggregate
 * @extends {AbstractAggregate}
 */
export class UserAggregate extends AbstractAggregate {
  constructor(options: TAggregateConstructorParams) {
    super(options);
    this.state = new UserAggregateState();
  }
  /**
   * Optional list of commands supported by User Aggregate
   *
   * @type {string[]}
   * @readonly
   * @static
   * @memberof UserAggregate
   */
  static get handles() {
    return ["createUser", "changeUserPassword"];
  }

  createUser(commandPayload: CreateUserCommand["payload"]) {
    // validate command format
    if (!commandPayload)
      throw new TypeError("commandPayload argument required");
    if (!commandPayload.username)
      throw new TypeError("commandPayload.username argument required");
    if (!commandPayload.name)
      throw new TypeError("commandPayload.name argument required");
    if (!commandPayload.password)
      throw new TypeError("commandPayload.password argument required");

    // validate aggregate state
    if (this.version !== 0) throw new Error(`User ${this.id} already created`);

    const { username, name, password } = commandPayload;

    this.emit("userCreated", {
      username,
      name,
      passwordHash: md5Hash(password),
    });
  }

  changeUserPassword(commandPayload: ChangePasswordCommand["payload"]) {
    // validate command format
    if (!commandPayload)
      throw new TypeError("commandPayload argument required");
    if (!commandPayload.oldPassword)
      throw new TypeError("commandPayload.oldPassword argument required");
    if (!commandPayload.password)
      throw new TypeError("commandPayload.password argument required");

    // validate aggregate state
    if (this.version === 0) throw new Error(`User ${this.id} does not exist`);

    const { oldPassword, password } = commandPayload;
    if (md5Hash(oldPassword) !== this.state.passwordHash)
      throw new Error("Old password does not match");

    this.emit("userPasswordChanged", {
      passwordHash: md5Hash(password),
    });
  }
}
