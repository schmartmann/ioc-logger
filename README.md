# Unified Logger
To demonstrate an IoC library, I built a quick Express app using Typescript which then calls the Unified Logger to log error messages.

## Summary
The SDK is a very basic beginning of what could be a very complex library, which creates a singular library to house all the different logging tools that could be required throughout an app's course of life.

## Usage
Due to time constraints, there are only two extensions to the library: the standard node `fs` writer, and the built-in `console` logger. The idea is that, if this were to be a real library, a new third-party logger would be added as a dependency, and then a new class to manager it in the `lib/unified-logger/handlers` directory would be added, and that handler module would be all that you'd need to pass into instances of the `Unified Logger`. So, if you were to add AWS to log output to CloudWatch, all you'd need is to add the package, create a `cloudwatch-handler`, and pass that into the logger.

Currently, the `fs-handler` can output logs to a local `.txt` file, and will output it to either the `/errors`, `/logs`, or `/warnings` directory, depending on which function is invoked. This is intended just to demonstrate how all the pieces fit together. The `console` logger is the current fall-back, in case the logger receives either an unsupported logger, or does not have one passed in, and simply logs to the node console as is typical.

The three main console functions (log, error, and warn), are all supported, and the `fs-handler` has methods that map to these original, console functions. The idea is that any subsequent logging service would have a handler that maps its functionality onto these original three functions, to maintain a clean separation of concerns.

## Routes
- `POST /fs` will test the `fs-handler` implementation of the library, and will write a date-stamped log file to the local repo. 
- `POST /console` will demonstrate the behavior of the fall-back console logger.

## Installation
1. Clone repo
2. Enter repo
3. `$ npm install`
4. `$ npm run start`
5. POST to one of the two routes above.