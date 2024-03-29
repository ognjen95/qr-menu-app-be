import { ICommand } from '@nestjs/cqrs';

export class AuthenticateUserCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
