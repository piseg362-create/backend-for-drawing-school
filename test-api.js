const http = require('http');

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/attendance',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer test-token'
  }
}, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log(`BODY: ${body}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
