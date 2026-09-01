export function getDatoCmsToken(): string {
  const token = process.env.DATOCMS_API_TOKEN;
  if (!token) {
    throw new Error('DATOCMS_API_TOKEN is not set');
  }
  return token;
}



