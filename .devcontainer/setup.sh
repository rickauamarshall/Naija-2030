#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
npm ci --prefix server
python3 scripts/validate.py
python3 -m py_compile scripts/*.py
