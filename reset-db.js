const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function resetDB() {
  const uri = process.env.DATABASE_URI;
  if (!uri) {
    console.error('DATABASE_URI is not set in .env');
    process.exit(1);
  }

  console.log(`Connecting to database to reset schema...`);
  const client = new Client({ connectionString: uri });

  try {
    await client.connect();
    console.log('Connected successfully. Dropping public schema...');
    
    await client.query('DROP SCHEMA public CASCADE;');
    await client.query('CREATE SCHEMA public;');
    
    console.log('Database reset successfully! The public schema is now clean.');
  } catch (err) {
    console.error('Error resetting database:', err.message);
  } finally {
    await client.end();
  }
}

resetDB();
