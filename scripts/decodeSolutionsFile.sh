#!/usr/bin/env bash
set -e

SOLUTIONS_FILE=./riddles/valid-solutions.yaml

base64 --decode "$SOLUTIONS_FILE" > solutions-env.yaml
echo 'Created solutions-env.yaml with the decoded content.'
