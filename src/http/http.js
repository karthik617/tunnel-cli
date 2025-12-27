const net = require("net");
const dotenv = require("dotenv");
dotenv.config();

function createTunnelHttp(
  localPort,
  targetHost = "localhost",
  remoteHost = process.env.TUNNEL_HOST || "localhost"
) {
  const tunnelSocket = net.connect(9001, remoteHost, () => {
    tunnelSocket.write(`HTTP:${targetHost}:${localPort}`);
  });

  tunnelSocket.on("data", (data) => {
    const messages = data.toString().trim().split("\n");

    for (const msg of messages) {
      if (msg.startsWith("URL")) {
        console.log("🌍 Public URL:", msg.split(" ")[1]);
      }

      if (msg.startsWith("HTTP_RELAY")) {
        const [, , relayPort] = msg.split(" ");
        handleRelay(relayPort);
      }
    }
  });

  function handleRelay(relayPort) {
    const relaySocket = net.connect(relayPort, remoteHost);
    const localSocket = net.connect(localPort, targetHost);

    relaySocket.pipe(localSocket);
    localSocket.pipe(relaySocket);

    const cleanup = () => {
      relaySocket.destroy();
      localSocket.destroy();
    };

    relaySocket.on("close", cleanup);
    localSocket.on("close", cleanup);
    relaySocket.on("error", cleanup);
    localSocket.on("error", cleanup);
  }
}

module.exports = { createTunnelHttp };
