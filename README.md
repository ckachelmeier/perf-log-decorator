# perf-log-decorator
Typescript decorator for logging perfomance of methods.  Includes separate decoratores for logging syncronous methods and methods that return promises.

 ## Install
    $ npm install --save perf-log-decorator

## API
### Decorators
* @PerfLog.Performance(string) => Will log how long the method takes using the input string as a key.  If the key is not provided, the default key is [className].[methodName]
* @PerfLog.PromisePerformance(string) => Will log how long the promise returned by the method takes to resolve using the input string as a key.
Both decorators can take an optional second parameter to replace the call to console.log with a custom method.

### Additional global utility methods
* GetLogStatistics() => Will return an array with statistics about each method that is tracked.
* SetDefaultLogMethod(LogMethod) => Sets the default log method for all decorators.  Must be called before the classes are defined.  Can still be overridden by the decorator instance 

## Log Statistics
The following statistics are kept track of by a global log manager
* Number of successful calls
* Min\max runtime of the successful calls
* Average runtime of the successful calls
* Standard deviation of the runtime of successful calls
* Number of failed calls
* Min\max runtime of the failed calls
* Average runtime of the failed calls
* Standard deviation of the runtime of failed calls

## Performance notes
Expect the decorator to add ~0.2ms to every call to the function.  To test this in your use case, just add the decorator to a method twice with different tags.  The difference between the two averages is roughly how long the decorator is taking. 

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
    const logs = PerfLog.GetLogStatistics();

##Extension
You can install the [Performance Log Display](https://chrome.google.com/webstore/detail/performance-log-display/plobnbfcchcgjiljdmiahlioknjjeddp) Chrome extension to display the log results.