# node-poc
Node JS

This project is build on Node Package Manager(npm);

Project dependencies :
1. node.

Project dev dependencies :
1. concurrently (for live-server only)
2. nodemon (for live-server only)
3. typescript

To download repo : https://github.com/rkramakrishna17/node-poc

To report issues: https://github.com/rkramakrishna17/node-poc/issues

To start project in various modes :
1. npm install : to install dependencies
2. npm start : start a typescript compiler in watch mode and start a nodemon server concurrently
3. npm run-script build : compile with typescript compiler and start a node server

The distribution folder can be found in '/dist' folder

currently available routes

1. Ping
    1. Route: check ping ('/api/ping')
    2. Methods allowed : ['GET']
    3. Success output format : JSON
    4. Success output : { success: 'Server is running' }
    5. failure output format : JSON
    6. failure output : { 'error': message || 'Method not allowed' }
