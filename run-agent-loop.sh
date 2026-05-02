#!/usr/bin/env bash
set -u

MAX_ROUNDS=8

for i in $(seq 1 "$MAX_ROUNDS"); do
  echo "======================================"
  echo " WMS Agent Loop - Round $i / $MAX_ROUNDS"
  echo "======================================"

  gemini -p "$(cat prompts/02_audit_and_fix_loop.md)"

  echo "Running build check..."
  npm run build
  BUILD_STATUS=$?

  if [ $BUILD_STATUS -ne 0 ]; then
    echo "Build failed. Continue to next agent round."
    continue
  fi

  if [ -f "docs/agent/06_ITERATION_LOG.md" ]; then
    if grep -qi "Build status: PASS" docs/agent/06_ITERATION_LOG.md \
      && grep -qi "Mobile status: PASS" docs/agent/06_ITERATION_LOG.md \
      && grep -qi "UAT status: PASS" docs/agent/06_ITERATION_LOG.md \
      && grep -qi "Handover status: PASS" docs/agent/06_ITERATION_LOG.md; then
        echo "All delivery gates passed."
        break
    fi
  fi

  echo "Some gates are not PASS yet. Continue loop..."
done