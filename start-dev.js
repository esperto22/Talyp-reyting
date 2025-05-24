// start-dev.js
import { networkInterfaces } from "os";
import { spawn } from "child_process";

function getLocalIP() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}

const ip = getLocalIP();
console.log(`🌐 Starting Vite on IP: http://${ip}:5173`);

const vite = spawn("vite", ["--host", ip], { stdio: "inherit", shell: true });

vite.on("exit", (code) => {
  console.log(`Vite exited with code ${code}`);
});
