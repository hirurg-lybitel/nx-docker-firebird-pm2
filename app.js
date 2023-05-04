const http = require('http');

const hostname = '0.0.0.0';
// const hostname = 'gdmn.crm';
const port = 3000;

console.log('config', process.env.NODE_ENV, process.env.NODE_FB_DB);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
