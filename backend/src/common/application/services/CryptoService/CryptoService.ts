import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { ICryptoService } from "~common/application/services/CryptoService/ICryptoService";
import { LoginConfig } from "~config/LoginConfig";

@Injectable()
export class CryptoService implements ICryptoService {
  hash(input: string): Promise<string> {
    return bcrypt.hash(input, LoginConfig.encryptHash);
  }

  compare(input: string, hashedInput: string): Promise<boolean> {
    return bcrypt.compare(input, hashedInput);
  }
}
