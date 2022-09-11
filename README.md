# Programming task: Filearchive

## Dependencies
- The project needs Node.js and a local instance of mongodb to run.
- It's developed and tested with mongodb-community@5.0 and node 17.5.
- The server tries to connect to the database at localhost:27017 (can be changed in `server/.env`)

## Running the project
- There is a script in the root directory, `run.sh`, that starts both the server and the frontend. 
- The server runs at port 3001 and the frontend at port 3000.
- Start the processes manually by running `npm start` in /server and /frontend.