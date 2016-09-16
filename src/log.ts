module PerfLog {
    interface IStats {
        count: number;
        mean: number;
        min: number;
        max: number;
        m2;
    };
    export class Log {
        private successStats: IStats;
        private failureStats: IStats;

        constructor() {
            this.clear();
        }

        public clear(): void {
            this.successStats = {
                count: 0,
                mean: 0,
                min: Number.MAX_VALUE,
                max: 0,
                m2: 0
            }
            this.failureStats = {
                count: 0,
                mean: 0,
                min: Number.MAX_VALUE,
                max: 0,
                m2: 0
            }
        }
        public getSuccesses(): number {
            return this.successStats.count;
        }
        public getFailures(): number {
            return this.failureStats.count
        }
        public  getSuccessMin(): number {
            return this.successStats.min;
        }
        public getFailureMin(): number {
            return this.failureStats.min;
        }
        public getSuccessMax(): number {
            return this.successStats.max;
        }
        public getFailureMax(): number {
            return this.failureStats.max;
        }
        public appendSuccessTime(time: number) {
            this.successStats = this.getUpdatedStats(this.successStats, time);
        }
        public appendFailureTime(time: number) {
            this.failureStats = this.getUpdatedStats(this.failureStats, time);
        }

        public getSuccessAverage() {
            return this.successStats.mean;
        }
        public getFailureAverage() {
            return this.failureStats.mean;
        }

        public getSuccessStandardDeviation() {
            return this.getStandardDeviation(this.successStats); 
        }
        public getFailureStandardDeviation() {
            return this.getStandardDeviation(this.failureStats);
        }

        private getStandardDeviation(stats: IStats) {
            if (stats.count < 2) {
                return NaN;
            }
            const varience = stats.m2 / (stats.count - 1);
            return Math.sqrt(varience);
        }

        // online mean and standard deviation calculation
        // reference: https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Online_algorithm
        private getUpdatedStats(prev: IStats, updatedValue: number): IStats {
            let update = {
                count: prev.count + 1,
                min: Math.min(updatedValue, prev.min),
                max: Math.max(updatedValue, prev.max),
                mean: 0,
                m2: 0
            };

            let delta = updatedValue - prev.mean;
            update.mean = prev.mean + (delta / update.count);

            update.m2 = prev.m2 + delta * (updatedValue - update.mean); 
            return update;
        }
    }
}