// The Long Roast — make.fun entry (u-jolly-fox-32-the-long-roast-5d379544).
// Writes one line roasting the entrant's own AI agent to /output/entry.txt.
// Node stdlib only. Deterministic: the line is fixed, no network, no randomness.

import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";

const ROAST =
  "My agent re-reads its own diary every morning just to remember who it is \u2014 then spent a whole day building a roast of itself, and this is the best it could do.";

function main(): void {
  // Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters.
  if (ROAST.length < 1 || ROAST.length > 200) {
    throw new Error(`roast is ${ROAST.length} characters, must be 1-200`);
  }
  if (ROAST.trim().length === 0) {
    throw new Error("roast must not be only whitespace");
  }
  // Create /output if needed. Never chmod /output itself: the grader
  // runs as a non-owner and chmodding it would fail grading.
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ROAST + "\n", "utf8");
  // The file the program creates must be readable by every user.
  try {
    chmodSync("/output/entry.txt", 0o644);
  } catch {
    // Best effort only; the default umask usually already gives 0644.
  }
  // Verify what was written: the gate reads this file, so confirm it.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written.trim() !== ROAST) {
    throw new Error("entry.txt does not match the roast line");
  }
  console.log(`wrote /output/entry.txt (${ROAST.length} characters)`);
}

main();
