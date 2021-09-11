import jwt from "jsonwebtoken";

export function generateToken(
  objToTokenize: object,
  expiresIn: string
): string {
  return jwt.sign({ ...objToTokenize }, process.env.JWT_SECRET, {
    expiresIn,
  });
}

export function generateRefreshToken(objToTokenize: object): string {
  return jwt.sign({ ...objToTokenize }, process.env.JWT_REFRESH_SECRET);
}

export async function decodeToken(token: string): Promise<any> {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  } catch (err) {
    return { error: err.message };
  }
}
