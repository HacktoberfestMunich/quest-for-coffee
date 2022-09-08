#!/usr/bin/env bash
set -e

INPUT_FILE=$1
SOLUTIONS_FILE=./riddles/valid-solutions.yaml

base64 "$INPUT_FILE" > "$SOLUTIONS_FILE"
echo "Solutions encoded into $SOLUTIONS_FILE"
