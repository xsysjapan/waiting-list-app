export interface CreateUserCommand extends ICommand {
  type: "createUser";
  payload: {
    username: string;
    name: string;
    password: string;
  };
}

export interface ChangePasswordCommand extends ICommand {
  type: "changePassword";
  payload: {
    oldPassword: string;
    password: string;
  };
}
