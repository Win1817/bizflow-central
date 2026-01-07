
import { createSchema, dropSchema } from './schema';

const setup = async () => {
  try {
    await dropSchema();
    await createSchema();
    console.log('Database setup complete.');
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
};

setup();
