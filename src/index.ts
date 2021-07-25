import { decodeToken, generateToken } from './generators/jwt';

export * from './checkers';
export * from './fetch';
export * from './generators';
export * from './logger';
export * from './sanitizer';
export * from './validators';

async function test() {
  const encoded = await generateToken({ hello: 'world' }, '1d');

  const decoded = await decodeToken(encoded);

  console.log(decoded);
}

test();
