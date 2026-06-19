/* eslint-disable @typescript-eslint/no-require-imports */
const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function auditDB() {
  const uri = process.env.DATABASE_URI;
  const client = new Client({ connectionString: uri });

  try {
    await client.connect();
    console.log('--- DATABASE AUDIT ---');

    // 1. All Tables & Row Counts
    console.log('\n--- TABLES ---');
    const tablesRes = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);

    for (let row of tablesRes.rows) {
      const countRes = await client.query(`SELECT COUNT(*) FROM "${row.table_name}"`);
      console.log(`Table: ${row.table_name} | Rows: ${countRes.rows[0].count}`);
    }

    // 2. All Enums
    console.log('\n--- ENUMS ---');
    const enumsRes = await client.query(`
      SELECT t.typname AS enum_name,
             string_agg(e.enumlabel, ', ') AS enum_values
      FROM pg_type t
      JOIN pg_enum e ON t.oid = e.enumtypid
      JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      WHERE n.nspname = 'public'
      GROUP BY t.typname;
    `);

    for (let row of enumsRes.rows) {
      console.log(`Enum: ${row.enum_name} | Values: [${row.enum_values}]`);
    }

    // 3. Foreign Keys (Summary)
    console.log('\n--- FOREIGN KEYS ---');
    const fkRes = await client.query(`
      SELECT count(*) as total_fks
      FROM information_schema.table_constraints
      WHERE constraint_type = 'FOREIGN KEY' AND table_schema = 'public';
    `);
    console.log(`Total Foreign Keys: ${fkRes.rows[0].total_fks}`);

    // 4. Indexes (Summary)
    console.log('\n--- INDEXES ---');
    const idxRes = await client.query(`
      SELECT count(*) as total_indexes
      FROM pg_indexes
      WHERE schemaname = 'public';
    `);
    console.log(`Total Indexes: ${idxRes.rows[0].total_indexes}`);
  } catch (err) {
    console.error('Audit Error:', err.message);
  } finally {
    await client.end();
  }
}

auditDB();
