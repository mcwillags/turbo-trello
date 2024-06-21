import { ICommand } from "~common/application/interfaces/ICommand";
import { ResetSessionDto } from "~features/auth/application/dto/ResetSessionDto";
import { ResetSessionResponse } from "~features/auth/application/responses/ResetSessionResponse";

export abstract class IResetSessionCommand extends ICommand<ResetSessionDto, ResetSessionResponse> {};