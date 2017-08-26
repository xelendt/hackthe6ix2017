# Getting Started

* Make sure you have MongoDB installed
* Run the following commands: 

    npm install
    npm start

# Endpoints

## `/state`

* `GET` - returns a single state if one exists
* `POST` - creates a single state and returns the created state with its `stateId`
  * Format:

    { "moved": boolean }

## `/stateById/:stateId`

* `GET` - returns a single state associated with `:stateId`
* `PUT` - updates the state associated with `:stateId` 
  * Format:

    { "moved": boolean }

