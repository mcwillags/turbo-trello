export interface ICryptoService {
  hash(input: string): Promise<string>;

  compare(input: string, hashedInput: string): Promise<boolean>;
}
