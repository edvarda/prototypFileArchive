#!/bin/bash
(
  trap 'kill 0' SIGINT
  npm start --prefix server &
  npm start --prefix frontend
)
