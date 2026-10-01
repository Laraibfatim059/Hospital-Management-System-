const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const backupDatabase = () => {
  // DB Name (from standard mongo URI format) or just hardcoded for standard env
  const dbName = 'hospitalDB'; // We default to hospitalDB in Phase 1
  const backupDir = path.join(__dirname, '../../backups');
  const date = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  const backupPath = path.join(backupDir, `${dbName}-${date}`);

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Assuming local mongo installation for mongodump
  const command = `mongodump --db ${dbName} --out "${backupPath}"`;

  console.log(`Starting backup: ${command}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Backup error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Backup stderr: ${stderr}`);
    }
    console.log(`Backup successfully created at ${backupPath}`);
  });
};

backupDatabase();
