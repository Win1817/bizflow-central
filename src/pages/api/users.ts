
import { pool } from '@/integrations/postgres/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const { rows } = await pool.query('SELECT id, first_name, last_name, email, role FROM users');
    response.status(200).json({ users: rows });
  } catch (error) {
    console.error('Error fetching users:', error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
}
