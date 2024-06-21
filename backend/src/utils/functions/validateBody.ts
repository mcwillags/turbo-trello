import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export async function validateBody<ValidationClass extends object, Body>(
  ValidationClass: ClassConstructor<ValidationClass>,
  body: Body
) {
  const instanceFromBody = plainToInstance(ValidationClass, body);

  const errors = await validate(instanceFromBody);

  const errorMessages = errors.flatMap(({ constraints }) => Object.values(constraints));

  return errorMessages;
}
