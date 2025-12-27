# tunnel-cli

A lightweight TCP & HTTP tunneling CLI (ngrok-style).

## Install
```bash
npm install -g tunnel-cli

```bash
# TCP tunnel
tunnel tcp 3000
```bash
# HTTP tunnel
tunnel http 8080
```bash
# Custom host
tunnel http 3000 localhost my.tunnel.server

```bash
# Environment variables
TUNNEL_HOST=your.server.com
