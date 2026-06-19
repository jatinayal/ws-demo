import { getPayload } from 'payload';
import config from '@payload-config';
import { seedData } from '../seed';

const run = async () => {
  const payload = await getPayload({ config });
  const args = process.argv.slice(2);
  const reset = args.includes('--reset');
  const force = args.includes('--force');

  payload.logger.info('Starting external seed script...');

  if (process.env.NODE_ENV === 'production' && !force) {
    payload.logger.warn('Seed script is restricted in production. Use --force to execute.');
    process.exit(0);
  }

  try {
    await seedData(payload, { reset, environment: process.env.NODE_ENV || 'development' });
    payload.logger.info('Seed script completed successfully.');
    process.exit(0);
  } catch (err) {
    payload.logger.error(`Seed script failed: ${err}`);
    process.exit(1);
  }
};

run();
