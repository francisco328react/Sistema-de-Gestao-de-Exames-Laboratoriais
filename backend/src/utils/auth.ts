import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'seu_jwt_secreto';

export function gerarToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verificarToken(token: string) {
  return jwt.verify(token, SECRET);
}
