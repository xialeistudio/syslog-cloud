import * as crypto from 'crypto';

export function md5(data: string | Buffer) {
  const m = crypto.createHash('md5');
  m.update(data);
  return m.digest('hex');
}
