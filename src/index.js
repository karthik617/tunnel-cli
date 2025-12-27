const { createTunnelTcp } = require("./tcp/tcp");
const { createTunnelHttp } = require("./http/http");

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(`
Usage:
  tunnel tcp <localPort> [targetHost] [remoteHost]
  tunnel http <localPort> [targetHost] [remoteHost]

Examples:
  tunnel tcp 3000
  tunnel http 8080 localhost
`);
  process.exit(1);
}

const [mode, localPort, targetHost, remoteHost] = args;

if (mode === "tcp") {
  createTunnelTcp(
    parseInt(localPort, 10),
    targetHost,
    remoteHost
  );
} else if (mode === "http") {
  createTunnelHttp(
    parseInt(localPort, 10),
    targetHost,
    remoteHost
  );
} else {
  console.error("❌ Invalid mode. Use 'tcp' or 'http'");
  process.exit(1);
}
