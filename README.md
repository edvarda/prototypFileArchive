# Programming task: Filearchive
I completed the task not in one sitting, but something like three. First session I read the brief, made some notes and a plan. Second session I coded for a couple of hours and started to get things working (2.5 hour commit), and last session I completed the project.

I like to take notes to organize my thoughts when working. They are kept in [notes.md](./notes.md). 

## Dependencies
- The project needs Node.js and a local instance of mongodb to run.
- It's developed and tested with mongodb-community@5.0 and node 17.5.
- The server tries to connect to the database at localhost:27017 (can be changed in `server/.env`)

## Running the project
- There is a script in the root directory, `run.sh`, that starts both the server and the frontend. 
- The server runs at port 3001 and the frontend at port 3000.
- Start the processes manually by running `npm start` in /server and /frontend.