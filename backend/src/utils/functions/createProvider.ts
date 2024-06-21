import { Provider } from "@nestjs/common";
import { ClassConstructor } from "class-transformer";

export function createProvider(provide: any, useClass: ClassConstructor<unknown>): Provider {
  return {
    provide,
    useClass,
  };
}
