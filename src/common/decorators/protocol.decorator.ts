import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Protocol = createParamDecorator(
  (defaultValue: string, ctx: ExecutionContext) => {
    console.log('-> defvalue', { defaultValue });
    const request = ctx.switchToHttp().getRequest();

    return request.protocol;
  },
);
