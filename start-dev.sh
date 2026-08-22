#!/bin/bash
export PATH="/opt/homebrew/bin:$PATH"
cd "$(dirname "$0")"
exec npm run dev -- --port "${PORT:-5173}" --strictPort
