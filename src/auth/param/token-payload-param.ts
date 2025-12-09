import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { TOKEN_PAYLOAD_NAME } from '../common/token-request';

export const TokenPayloadParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const tokenPayload = req[TOKEN_PAYLOAD_NAME] as string;
    return tokenPayload;
  },
);
