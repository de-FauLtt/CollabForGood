import pg from 'pg';
import 'dotenv/config';

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

(async () => {
  try {
    await client.connect();
    const res = await client.query('select now()');
    console.log('Connected! now() =', res.rows[0]);
  } catch (e) {
    console.error('DB connect error:', e.message);
  } finally {
    await client.end();
  }
})();
