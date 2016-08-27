
module PerfLog {
    let logManager = new LogManager();

    export interface LogMethod { 
        (message: string, name?: string, timeTaken?: number): void;
    }

    export function PromisePerformance(name: string, logMethod: LogMethod = console.log.bind(console)) {
        let log = logManager.getLog(name);
        if (!logMethod) {
            logMethod = () => {};
        }
        return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
            let originalMethod = descriptor.value;
            descriptor.value = function(...args: any[]) {
                let startTime = performance.now();
                let timeTaken;
                let result = originalMethod.apply(this, args);
                if (result && result.then) {
                    return result.then((val) => {
                        timeTaken = performance.now() - startTime;
                        logMethod(name, timeTaken);
                        log.appendSuccessTime(timeTaken);
                        return val;
                    }).catch((e) => {
                        timeTaken = performance.now() - startTime;
                        logMethod(name, timeTaken);
                        log.appendFailureTime(timeTaken);
                        throw e;
                    });
                } else {
                    logMethod("could not evaluate promise");
                }
            };
        };
    }

    export function Performance(name: string, logMethod: LogMethod = console.log.bind(console)) {
        let log = logManager.getLog(name);
        if (!logMethod) {
            logMethod = () => {};
        }
        return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
            let originalMethod = descriptor.value;
            descriptor.value = function(...args: any[]) {
                let startTime = performance.now();
                let timeTaken;
                let result = originalMethod.apply(this, args);
                timeTaken = performance.now() - startTime;
                logMethod("finished method " + name + ".  Took " + timeTaken + " milliseconds");
                log.appendSuccessTime(timeTaken);
                return result;
            };
        };
    }

    export function GetLogManager() {
        return logManager;
    }
}