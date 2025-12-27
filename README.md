# tunnel-cli

A lightweight TCP & HTTP tunneling CLI (ngrok-style).

## Install
```bash
npm install -g tunnel-cli

# TCP tunnel
tunnel tcp 3000
# HTTP tunnel
tunnel http 8080
# Custom host
tunnel http 3000 localhost my.tunnel.server
