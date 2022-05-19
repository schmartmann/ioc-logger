# Unified Logger
To demonstrate an IoC library, I built a quick Express app using Typescript which then calls the Unified Logger to log error messages.

The SDK is a very basic beginning of what could be a very complex library, which creates a singular library to house all the different logging tools that could be required throughout an app's course of life.

Due to time constraints, there are only two extensions to the library: the standard node `fs` writer, and the built-in `console` logger. The idea is that, if this were to be a real library, additional loggers would be added, along with a `log-writer