import { DataSource } from 'typeorm';
import { seedDatabase } from './seed';

async function runSeed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dinelocal',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: false,
  });

  try {
    await dataSource.initialize();
    console.log('Database connection established');
    
    await seedDatabase(dataSource);
    
    console.log('Seed script completed successfully');
  } catch (error) {
    console.error('Error running seed script:', error);
  } finally {
    await dataSource.destroy();
  }
}

runSeed();