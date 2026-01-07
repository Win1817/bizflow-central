
import 'dotenv/config';
import { pool } from './client';

const seed = async () => {
  try {
    const client = await pool.connect();

    // Clear existing data to prevent conflicts
    await client.query('DELETE FROM users;');
    await client.query('DELETE FROM customers;');
    await client.query('DELETE FROM products;');

    // Seed Users
    // Note: Use a proper password hashing library like bcrypt in a real application
    await client.query(`
      INSERT INTO users (username, first_name, last_name, password_hash, email, role) VALUES
      ('admin@bizflow.com', 'Admin', 'User', 'hashed_password_admin', 'admin@bizflow.com', 'admin'),
      ('manager@example.com', 'John', 'Doe', 'hashed_password_manager', 'manager@example.com', 'manager'),
      ('user@example.com', 'Jane', 'Doe', 'hashed_password_user', 'user@example.com', 'user');
    `);

    // Seed Customers
    await client.query(`
      INSERT INTO customers (name, email, phone, address) VALUES
      ('John Doe', 'john.doe@example.com', '123-456-7890', '123 Main St, Anytown, USA'),
      ('Jane Smith', 'jane.smith@example.com', '987-654-3210', '456 Oak Ave, Othertown, USA');
    `);

    // Seed Products
    await client.query(`
      INSERT INTO products (name, sku, description, price, stock, min_stock) VALUES
      ('Laptop', 'LP123', 'A powerful laptop for all your needs.', 1200.00, 50, 10),
      ('Mouse', 'MS456', 'An ergonomic mouse.', 25.00, 200, 20);
    `);

    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
};

seed();
