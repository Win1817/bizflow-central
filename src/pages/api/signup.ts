
import { pool } from '../../integrations/postgres/client';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

const SALT_ROUNDS = 10;

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, firstName, lastName, email, password } = req.body;

  if (!username || !firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  let client;
  try {
    client = await pool.connect();

    // Check if user already exists
    const existingUser = await client.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
    if (existingUser.rows.length > 0) {
      const existingField = existingUser.rows[0].email === email ? 'email' : 'username';
      return res.status(409).json({ message: `User with this ${existingField} already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await client.query(
      'INSERT INTO users (username, first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, role',
      [username, firstName, lastName, email, hashedPassword]
    );

    const newUser = result.rows[0];

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (client) {
      client.release();
    }
  }
}
