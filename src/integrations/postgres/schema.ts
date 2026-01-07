
import { pool } from './client';

export const createSchema = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // User Roles Enum Type
    await client.query(`
      DO $$ BEGIN
        CREATE TYPE user_role AS ENUM ('admin', 'manager', 'user');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        role user_role NOT NULL
      );
    `);

    // Customers Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        address TEXT
      );
    `);

    // Leads Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        status VARCHAR(50) DEFAULT 'new'
      );
    `);

    // Products Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        sku VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        price NUMERIC(10, 2) NOT NULL,
        stock INTEGER NOT NULL,
        min_stock INTEGER NOT NULL
      );
    `);

    // Suppliers Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        contact_person VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50)
      );
    `);

    // Sales Orders Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS sales_orders (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES customers(id),
        order_date TIMESTAMPTZ DEFAULT NOW(),
        status VARCHAR(50) DEFAULT 'pending',
        total NUMERIC(10, 2) NOT NULL
      );
    `);

    // Quotations Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS quotations (
        id SERIAL PRIMARY KEY,
        lead_id INTEGER REFERENCES leads(id),
        quotation_date TIMESTAMPTZ DEFAULT NOW(),
        expiry_date TIMESTAMPTZ,
        total NUMERIC(10, 2) NOT NULL
      );
    `);

    // Invoices Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS invoices (
        id SERIAL PRIMARY KEY,
        sales_order_id INTEGER REFERENCES sales_orders(id),
        invoice_date TIMESTAMPTZ DEFAULT NOW(),
        due_date TIMESTAMPTZ,
        status VARCHAR(50) DEFAULT 'draft',
        total NUMERIC(10, 2) NOT NULL
      );
    `);

    await client.query('COMMIT');
    console.log('Schema created successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating schema:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Optional: Add a function to drop the schema for testing purposes
export const dropSchema = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('DROP TABLE IF EXISTS users, invoices, quotations, sales_orders, suppliers, products, leads, customers CASCADE');
        await client.query('DROP TYPE IF EXISTS user_role');
        await client.query('COMMIT');
        console.log('Schema dropped successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error dropping schema:', error);
        throw error;
    } finally {
        client.release();
    }
}
