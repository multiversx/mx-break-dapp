export function encode(input: string) {
  return escape(Buffer.from(input, 'utf8').toString('base64'));
}

function escape(input: string) {
  return input.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
