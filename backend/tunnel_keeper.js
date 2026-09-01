const localtunnel = require('localtunnel');
const http = require('http');

let activeTunnel = null;

async function launchTunnel() {
  try {
    if (activeTunnel) {
      try { activeTunnel.close(); } catch (e) {}
    }

    activeTunnel = await localtunnel({ port: 5000 });

    console.log('\n========================================================');
    console.log('🚀 YOUR PERMANENT LIVE PUBLIC WEBSITE LINK IS READY:');
    console.log(`🌐 ${activeTunnel.url}`);
    console.log('========================================================\n');

    activeTunnel.on('close', () => {
      console.warn('⚠️  Tunnel connection dropped. Re-establishing link in 2 seconds...');
      setTimeout(launchTunnel, 2000);
    });

    activeTunnel.on('error', (err) => {
      console.error('⚠️  Tunnel error:', err.message);
      setTimeout(launchTunnel, 3000);
    });

  } catch (err) {
    console.error('⚠️  Failed to connect tunnel:', err.message);
    setTimeout(launchTunnel, 5000);
  }
}

// Keepalive heartbeat ping to backend every 10s to prevent idle disconnects
setInterval(() => {
  http.get('http://localhost:5000/api/dashboard', (res) => {
    // heartbeat alive
  }).on('error', () => {});
}, 10000);

launchTunnel();
