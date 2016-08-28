# perf-log-decorator
Typescript decorator for logging perfomance of methods.  Includes separate decoratores for logging syncronous methods and methods that return promises.

 ## Install
    $ npm install --save perf-log-decorator

## API
* @PerfLog.Performance(string) => Will log how long the method takes using the input string as a key.
* @PerfLog.PromisePerformance(string) => Will log how long the promise returned by the method takes to resolve using the input string as a key.

Both decorators can take an optional second parameter to replace the call to console.log with a custom method.

## LogManager
The following statistics are kept track of by a global LogManager
* Number of successful calls
* Average runtime of the successful calls
* Standard deviation of the runtime of successful calls
* Number of failed calls
* Average runtime of the failed calls
* Standard deviation of the runtime of failed calls

## Example
    class Test { 

        @PerfLog.PromisePerformance("test1")
        public longPromiseMethod(): Promise<string> {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 5000);
            });
        }

        @PerfLog.Performance("test2")
        public longSyncronousMethod() {
            for (let i = 0; i < 100000000; i++) {

            }
        }
    }

    // examine the logs
    const logs = PerfLog.GetLogManager().getFlatLogs();