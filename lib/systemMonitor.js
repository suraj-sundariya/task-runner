const os = require('os');

class SystemMonitor {
    constructor({ maxCpuUtilization, maxMemoryUtilization }) {
        this.maxCpuUtilization = maxCpuUtilization || 80; // in percentage
        this.maxMemoryUtilization = maxMemoryUtilization || 80; // in percentage
    }

    getCpuUsage() {
        const cpus = os.cpus();
        let totalIdle = 0, totalTick = 0;

        cpus.forEach(core => {
            for (let type in core.times) {
                totalTick += core.times[type];
            }
            totalIdle += core.times.idle;
        });

        return 100 - (100 * totalIdle / totalTick); // CPU usage in percentage
    }

    getMemoryUsage() {
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        return 100 - (100 * freeMemory / totalMemory); // Memory usage in percentage
    }

    async canProceed(activeTasks, concurrency) {
        const cpuUsage = this.getCpuUsage();
        const memoryUsage = this.getMemoryUsage();
        const res =
            cpuUsage < this.maxCpuUtilization &&
            memoryUsage < this.maxMemoryUtilization &&
            activeTasks.length < concurrency;

        if (!res) console.log("Waiting for task to complete", memoryUsage);
        return res;
    }
}

module.exports = SystemMonitor;
