/**
 * Stops a leftover Next.js dev server (lock file + port 3000).
 * Runs automatically via npm "predev" before "npm run dev".
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 3000);

function killPid(pid) {
  if (!pid || pid <= 0) return;
  try {
    if (process.platform === "win32") {
      execSync(`taskkill /PID ${pid} /F /T`, { stdio: "ignore" });
    } else {
      process.kill(pid, "SIGKILL");
    }
    console.log(`[dev] stopped stale process ${pid}`);
  } catch {
    /* already exited */
  }
}

function pidsOnPort(p) {
  if (process.platform === "win32") {
    try {
      const out = execSync(
        `powershell -NoProfile -Command "(Get-NetTCPConnection -LocalPort ${p} -State Listen -ErrorAction SilentlyContinue).OwningProcess | Sort-Object -Unique"`,
        { encoding: "utf8" }
      );
      return [
        ...new Set(
          out
            .split(/\r?\n/)
            .map((s) => parseInt(s.trim(), 10))
            .filter((n) => n > 0)
        ),
      ];
    } catch {
      return [];
    }
  }
  try {
    const out = execSync(`lsof -ti tcp:${p}`, { encoding: "utf8" });
    return out
      .trim()
      .split("\n")
      .map((s) => parseInt(s, 10))
      .filter((n) => n > 0);
  } catch {
    return [];
  }
}

function pidFromLockFile(lockPath) {
  try {
    const raw = fs.readFileSync(lockPath, "utf8").trim();
    const asNum = parseInt(raw, 10);
    if (asNum > 0) return asNum;
    const parsed = JSON.parse(raw);
    return parsed?.pid ?? parsed?.data?.pid;
  } catch {
    return null;
  }
}

const devDir = path.join(projectRoot, ".next", "dev");
if (fs.existsSync(devDir)) {
  for (const name of fs.readdirSync(devDir)) {
    if (!/lock/i.test(name)) continue;
    const lockPath = path.join(devDir, name);
    const pid = pidFromLockFile(lockPath);
    if (pid) killPid(pid);
    try {
      fs.unlinkSync(lockPath);
    } catch {
      /* ignore */
    }
  }
}

for (const pid of pidsOnPort(port)) {
  killPid(pid);
}

if (process.platform === "win32") {
  try {
    execSync('powershell -NoProfile -Command "Start-Sleep -Milliseconds 400"', {
      stdio: "ignore",
    });
  } catch {
    /* ignore */
  }
}
