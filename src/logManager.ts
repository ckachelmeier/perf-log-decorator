module PerfLog {
    interface LogIndexMap {
        [K: string]: number;
    }
    export interface IFlatLog {
        name: string;
        successes: number;
        successMin: number;
        successMax: number;
        successAverage: number;
        successStandardDeviation: number;
        failures: number;
        failureMin: number;
        failureMax: number;
        failureAverage: number;
        failureStandardDeviation: number;
    }

    export class LogManager {
        public logs: Log[] = [];
        private indexMap: LogIndexMap = {};

        public getLog(logName: string) {
            if (this.indexMap.hasOwnProperty(logName)) {
                return this.logs[this.indexMap[logName]]; 
            }
            var log = new Log();
            var index = this.logs.length;
            this.logs[index] = log;
            this.indexMap[logName] = index;

            return log;
        }

        public clearLogs() {
            for (let i = 0; i < this.logs.length; i++) {
                this.logs[i].clear();
            }
        }

        public getFlatLogs() {
            let flatLogs = [];

            for (let key in this.indexMap) {
                const log = this.logs[this.indexMap[key]]; 
                const flatLog = this.getFlatLog(key, log)
                flatLogs.push(flatLog);
            }

            return flatLogs;
        }

        private getFlatLog(name: string, log: Log): IFlatLog {
            return {
                name: name,
                successes: log.getSuccesses(),
                successMin: log.getSuccessMin(),
                successMax: log.getSuccessMax(),
                successAverage: log.getSuccessAverage(),
                successStandardDeviation: log.getSuccessStandardDeviation(),
                failures: log.getFailures(),
                failureMin: log.getFailureMin(),
                failureMax: log.getFailureMax(),
                failureAverage: log.getFailureAverage(),
                failureStandardDeviation: log.getFailureStandardDeviation()
            }
        }

    }
}