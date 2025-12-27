const net = require("net");
const dotenv = require("dotenv");
dotenv.config();

function createTunnelTcp(
  localPort,
  targetHost = "localhost",
  remoteHost = process.env.TUNNEL_HOST || "localhost"
) {
  const tunnelSocket = net.connect(9001, remoteHost, () => {
    tunnelSocket.write(`TCP:${targetHost}:${localPort}`);
  });

  tunnelSocket.on("data", (data) => {
    const messages = data.toString().trim().split("\n");

    for (const msg of messages) {
      if (msg.startsWith("URL")) {
        console.log("🌍 Public URL:", msg.split(" ")[1]);
      }

      if (msg.startsWith("RELAY")) {
        const [, , relayPort] = msg.split(" ");
        connectRelay(relayPort);
      }
    }
  });

  function connectRelay(relayPort) {
    const relaySocket = net.connect(relayPort, remoteHost);
    const localApp = net.connect(localPort, targetHost);

    relaySocket.pipe(localApp);
    localApp.pipe(relaySocket);

    const cleanup = () => {
      relaySocket.destroy();
      localApp.destroy();
    };

    relaySocket.on("close", cleanup);
    localApp.on("close", cleanup);
    relaySocket.on("error", cleanup);
    localApp.on("error", cleanup);
  }
}

module.exports = { createTunnelTcp };
