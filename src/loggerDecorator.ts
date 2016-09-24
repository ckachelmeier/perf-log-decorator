
module PerfLog {
    let logManager = new LogManager();

    export interface LogMethod {
        (name: string, success: boolean, timeTaken: number): void;
    }

    function defaultLogMethod (name: string, success: boolean, timeTaken: number): void {
        const status = (success) ? "success" : "fail";
        const message = `finished method ${name}.  Status: ${status}. Time: ${timeTaken}ms.`;
        console.log(message);
    }

    let selectedDefaultLogMethod = defaultLogMethod;

    export function PromisePerformance(name: string, logMethod: LogMethod = selectedDefaultLogMethod) {
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
                        logMethod(name, true, timeTaken);
                        log.appendSuccessTime(timeTaken);
                        return val;
                    }).catch((e) => {
                        timeTaken = performance.now() - startTime;
                        logMethod(name, false, timeTaken)
                        log.appendFailureTime(timeTaken);
                        throw e;
                    });
                } else {
                    console.warn("could not evaluate promise for method: " + name);
                }
            };
        };
    }

    export function Performance(name: string, logMethod: LogMethod = selectedDefaultLogMethod) {
        let log = logManager.getLog(name);
        if (!logMethod) {
            logMethod = () => {};
        }
        return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
            let originalMethod = descriptor.value;
            descriptor.value = function(...args: any[]) {
                let startTime = performance.now();
                let timeTaken;
                try {
                    let result = originalMethod.apply(this, args);
                    timeTaken = performance.now() - startTime;
                    logMethod(name, true, timeTaken);
                    log.appendSuccessTime(timeTaken);
                    return result;
                } catch (ex) {
                    timeTaken = performance.now() - startTime;
                    logMethod(name, false, timeTaken);
                    log.appendFailureTime(timeTaken);
                    throw ex;
                }
            };
        };
    }

    export function SetDefaultLogMethod(logMethod: LogMethod) {
        return selectedDefaultLogMethod = logMethod;
    }

    export function GetLogManager() {
        return logManager;
    }
}