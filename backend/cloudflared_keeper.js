const cloudflared = require('cloudflared');

async function runCloudflare() {
  try {
    console.log('Starting Cloudflare Tunnel...');
    const tunnel = await cloudflared.tunnel({ port: 5000 });
    const url = await tunnel.url;

    console.log('\n========================================================');
    console.log('🌐 YOUR CLOUDFLARE PUBLIC URL IS READY:');
    console.log(url);
    console.log('========================================================\n');
  } catch (err) {
    console.error('Cloudflare error:', err);
  }
}

runCloudflare();
