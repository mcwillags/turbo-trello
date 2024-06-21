import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { IUserPayload } from "~common/application/interfaces/IUserPayload";

export const TokenPayload = createParamDecorator((_: undefined, context: ExecutionContext): IUserPayload => {
  const request = context.switchToHttp().getRequest();

  return request.user;
});
