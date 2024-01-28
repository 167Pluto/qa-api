#!/bin/sh
set -eu

# Run migrations before starting the application
npm run migration:run

# Start the application
exec node dist/main
