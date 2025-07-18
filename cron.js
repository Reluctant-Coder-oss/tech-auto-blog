import cron from 'node-cron';
import { exec } from 'child_process';

console.log('⏳ Cron scheduler running...');

// Run scraper every 6 hours
cron.schedule('0 */6 * * *', () => {
  console.log('🔁 Running scraper...');
  exec('node scripts/scraper.js');
});

// Run AI rewriter 30 minutes later
cron.schedule('30 */6 * * *', () => {
  console.log('🧠 Running rewriter...');
  exec('node scripts/aiRewriter.js');
});
