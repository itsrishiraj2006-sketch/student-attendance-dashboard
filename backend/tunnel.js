const localtunnel = require('localtunnel');

(async () => {
  try {
    const tunnel = await localtunnel({ port: 5000 });

    console.log('========================================================');
    console.log('🔗 YOUR LIVE PRIVATE WEBSITE LINK IS READY:');
    console.log(`🌐 ${tunnel.url}`);
    console.log('========================================================');

    tunnel.on('close', () => {
      console.log('Tunnel closed');
    });
  } catch (err) {
    console.error('Error opening tunnel:', err);
  }
})();
