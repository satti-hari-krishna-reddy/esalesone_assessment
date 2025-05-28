const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

async function start() {
  await connectDB();


  app.listen(PORT, () => {
    console.log('[INFO] API server listening on port', PORT);
  });
}

start().catch(err => {
  console.log('[ERROR] Failed to start application:', err);
  process.exit(1);
});