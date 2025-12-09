export abstract class HashingProtocol {
  abstract createHash(password: string): Promise<string>;

  abstract compareHash(
    password: string,
    passwordHash: string,
  ): Promise<boolean>;
}
