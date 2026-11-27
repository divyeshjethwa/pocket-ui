#!/usr/bin/env bash
# Regenerates the README screenshots in docs/screenshots/.
# Builds the static Storybook, serves it locally, captures each view with headless
# Chrome at 2x, then renders it inside a macOS browser-window frame (frame.html).
#
# Usage: npm run screenshots          (macOS; override Chrome with CHROME=/path/to/chrome)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="$ROOT/docs/screenshots"
TMP="$(mktemp -d)"
PORT="${PORT:-6007}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
ADDRESS="${ADDRESS:-pocketui.netlify.app}"

cleanup() {
  if [[ -n "${SERVER_PID:-}" ]]; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
  rm -rf "$TMP"
}
trap cleanup EXIT

cd "$ROOT"
npm run -s build-storybook >/dev/null
python3 -m http.server "$PORT" --directory storybook-static >/dev/null 2>&1 &
SERVER_PID=$!
sleep 2

chrome() {
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$TMP/profile" \
    --virtual-time-budget=15000 "$@" >/dev/null 2>&1
}

# name | Storybook query
SHOTS=(
  "welcome|path=/docs/welcome--docs"
  "button-light|path=/story/components-button--all-variants&globals=theme:light&panel=false"
  "button-dark|path=/story/components-button--all-variants&globals=theme:dark&panel=false"
  "colors-light|path=/story/foundations-colors--semantic-roles&globals=theme:light&panel=false"
  "colors-dark-a11y|path=/story/foundations-colors--semantic-roles&globals=theme:dark&addonPanel=storybook/a11y/panel"
  "mobile-dark|path=/story/foundations-colors--semantic-roles&globals=theme:dark;viewport:mobile&panel=false"
)

mkdir -p "$OUT"
for entry in "${SHOTS[@]}"; do
  name="${entry%%|*}"
  query="${entry#*|}"
  chrome --force-device-scale-factor=2 --window-size=1440,900 \
    --screenshot="$TMP/$name.png" "http://localhost:$PORT/?$query"
  chrome --force-device-scale-factor=1.25 --window-size=1568,1088 \
    --default-background-color=00000000 --allow-file-access-from-files \
    --screenshot="$OUT/$name.png" \
    "file://$ROOT/scripts/screenshots/frame.html?img=$TMP/$name.png&url=$ADDRESS"
  echo "✓ docs/screenshots/$name.png"
done
