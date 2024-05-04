#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
    npm run seed
    npm run dev
else
    npm start
fi
