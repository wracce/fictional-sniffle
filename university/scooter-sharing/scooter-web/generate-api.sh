#!/bin/bash

npx openapi-generator-cli generate -i http://scooters-auth-service:3000/api-json -g typescript-axios -o src/api/auth
npx openapi-generator-cli generate -i http://scooters-users-service:3001/api-json -g typescript-axios -o src/api/users
npx openapi-generator-cli generate -i http://scooters-scooter-service:3002/v3/api-docs -g typescript-axios -o src/api/scooters
