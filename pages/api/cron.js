import { exec } from 'child_process';

export default function handler(req, res) {
  exec('node scripts/scraper.js && node scripts/aiRewriter.js', (err, stdout, stderr) => {
    if (err) {
      res.status(500).send(stderr);
    } else {
      res.status(200).send(stdout);
    }
  });
}
