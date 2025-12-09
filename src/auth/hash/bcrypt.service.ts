import { HashingProtocol } from './hashing.service';
import * as bcrypt from 'bcryptjs';
export class BcryptService extends HashingProtocol {
  async createHash(password: string): Promise<string> {
    const configHash = await bcrypt.genSalt();

    return bcrypt.hash(password, configHash);
  }
  async compareHash(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
