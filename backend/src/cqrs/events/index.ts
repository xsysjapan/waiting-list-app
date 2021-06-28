export interface UserCreatedEvent extends IEvent {
  type: "userCreated";
  payload: {
    username: string;
    name: string;
    passwordHash: string;
  };
}

export interface UserPasswordChangedEvent extends IEvent {
  type: "userPasswordChanged";
  payload: {
    passwordHash: string;
  };
}
