module PerfLog {
    interface LogIndexMap {
        [K: string]: number;
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

    }
}