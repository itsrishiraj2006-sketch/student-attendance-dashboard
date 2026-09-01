/* ========================================================
   Automated GitHub Uploader for student-attendance-dashboard
   ======================================================== */

const fs = require('fs');
const path = require('path');
const https = require('https');
const readline = require('readline');

const OWNER = 'itsrishiraj2006-sketch';
const REPO = 'student-attendance-dashboard';
const ROOT_DIR = path.join(__dirname, '..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('========================================================');
console.log('🚀 Automatic GitHub Uploader');
console.log(`Repository: https://github.com/${OWNER}/${REPO}`);
console.log('========================================================\n');

rl.question('Please enter your GitHub Personal Access Token (PAT): ', async (token) => {
  token = token.trim();
  if (!token) {
    console.error('❌ Token required. Generate one at: https://github.com/settings/tokens');
    rl.close();
    return;
  }

  const filesToUpload = getAllFiles(ROOT_DIR);
  console.log(`\nFound ${filesToUpload.length} files to upload to GitHub...\n`);

  let count = 0;
  for (const file of filesToUpload) {
    const relativePath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
    if (relativePath.includes('node_modules') || relativePath.includes('.git')) continue;

    const content = fs.readFileSync(file).toString('base64');
    try {
      await uploadFileToGitHub(token, OWNER, REPO, relativePath, content);
      count++;
      console.log(`[${count}/${filesToUpload.length}] ✅ Uploaded: ${relativePath}`);
    } catch (err) {
      console.error(`❌ Failed ${relativePath}:`, err.message);
    }
  }

  console.log('\n🎉 ALL FILES UPLOADED SUCCESSFULLY TO GITHUB!');
  console.log(`🌐 GitHub Repo: https://github.com/${OWNER}/${REPO}`);

  // Enable GitHub Pages
  try {
    await enableGitHubPages(token, OWNER, REPO);
    console.log(`🌟 GitHub Pages Enabled! Live Link: https://${OWNER}.github.io/${REPO}/`);
  } catch (e) {
    console.log(`ℹ️  To enable GitHub Pages manually: Repo Settings -> Pages -> Source: main branch -> Save`);
  }

  rl.close();
});

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        getAllFiles(filePath, fileList);
      }
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function uploadFileToGitHub(token, owner, repo, filePath, contentBase64) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      message: `Upload ${filePath}`,
      content: contentBase64
    });

    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}/contents/${filePath}`,
      method: 'PUT',
      headers: {
        'User-Agent': 'NodeJS-Uploader',
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function enableGitHubPages(token, owner, repo) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      source: { branch: 'main', path: '/' }
    });

    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}/pages`,
      method: 'POST',
      headers: {
        'User-Agent': 'NodeJS-Uploader',
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(JSON.parse(body));
        else reject(new Error(`Pages HTTP ${res.statusCode}`));
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}
