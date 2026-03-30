#!/usr/bin/env bash
set -euo pipefail

pnpm --dir backend dev &
BACKEND_PID=$!

pnpm --dir frontend dev &
FRONTEND_PID=$!

cleanup() {
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
}

trap cleanup INT TERM EXIT
wait
