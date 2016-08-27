module PerfLog {
    export class Log {
        private successTimes: number[] = [];
        private failureTimes: number[] = [];

        public clear(): void {
            this.successTimes = [];
            this.failureTimes = [];
        }
        public getSuccesses(): number {
            return this.successTimes.length;
        }
        public getFailures(): number {
            return this.failureTimes.length;
        }
        public appendSuccessTime(time: number) {
            this.successTimes.push(time);
        }
        public appendFailureTime(time: number) {
            this.failureTimes.push(time);
        }

        public getSuccessAverage() {
            return this.getAverage(this.successTimes);
        }
        public getFailureAverage() {
            return this.getAverage(this.failureTimes);
        }
        private getAverage(numbers: number[]) {
            if (numbers.length === 0) {
                return 0;
            }
            return numbers.reduce((prev, current) => {
                return prev + current;
            }) / numbers.length;
        }

        public getSuccessStandardDeviation() {
            return this.getStandardDeviation(this.successTimes);
        }
        public getFailureStandardDeviation() {
            return this.getStandardDeviation(this.failureTimes);
        }
        private getStandardDeviation(numbers: number[]) {
            if (numbers.length === 0) {
                return 0;
            }
            var average = this.getAverage(numbers);
            var x = numbers.reduce((prev, current) => {
                return prev + ((current - average) * (current - average));
            });
            return Math.sqrt(x / numbers.length);
        }
    }
}