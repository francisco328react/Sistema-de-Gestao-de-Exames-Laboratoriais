import bcrypt from 'bcrypt';

export async function hashSenha(senha: string) {
  return await bcrypt.hash(senha, 10);
}

export async function compararSenhas(senha: string, hash: string) {
  return await bcrypt.compare(senha, hash);
}
