import * as http from 'http';
import app from './app';
import db from './db';

const server = http.createServer(app.callback());
const host = process.env.SERVER_HOST! || 'localhost';
const port = parseInt(process.env.PORT!, 10) || 8080;

server.listen(port, host, () => {
  console.log(`  Server is running at http://${host}:${port} in ${app.env} mode.`);
});

// Graceful shutdown.
const shutdown = () => {
  server.close(() => {
    console.log('  Server closed.');
    db.instance.destroy(() => process.exit());
  });

  setTimeout(() => {
    process.exit(504);
  }, 10000);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
