#!/usr/bin/env bash
set -e

INPUT_STRING=$1

echo -n "$INPUT_STRING" | base64 --decode > solutions-env.yaml
echo 'Created solutions-env.yaml with the decoded content.'
