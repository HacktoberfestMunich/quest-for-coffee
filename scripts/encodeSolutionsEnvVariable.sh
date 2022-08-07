#!/usr/bin/env bash
set -e

INPUT_FILE=$1

echo 'Copy the following as environment variable into the GitHub secrets.'
base64 $INPUT_FILE
