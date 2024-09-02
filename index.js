const os = require('os');


class QueueHandler {

    constructor({ concurrency, maxCpuUtilization, maxMemoryUtilization }) {
        this.concurrency = concurrency || os.cpus().length;
        this.maxCpuUtilization = maxCpuUtilization || 80; // in percentage
        this.maxMemoryUtilization = maxMemoryUtilization || 80; // in percentage
        this.taskQueue = [];
        this.activeTasks = [];
        this.isRunning = false;
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

    async canProceed() {
        const cpuUsage = this.getCpuUsage();
        const memoryUsage = this.getMemoryUsage();
        const res = 
            cpuUsage < this.maxCpuUtilization &&
            memoryUsage < this.maxMemoryUtilization &&
            this.activeTasks.length < this.concurrency
        
        if(!res) console.log( "Waiting for task to complete ", memoryUsage)
        return res;
    }
  
    // Method to add multiple tasks to the queue
    addTasks(tasks) {
      for (const task of tasks) {
        this.taskQueue.push(task);
      }
      this.processQueue(); // Start processing the queue immediately after adding tasks
    }
  
    // Method to start processing tasks from the queue
    async processQueue() {
      while (this.taskQueue.length > 0 && await this.canProceed()) {
        const task = this.taskQueue.shift(); // Get the next task from the queue
        this.runTask(task); // Run the task
      }
  
      // Wait for all active tasks to finish if the queue is empty but there are still active tasks
      if (this.taskQueue.length === 0) {
        await this.drain();
      }
    }
  
    // Method to run an individual task
    runTask(task) {
      const taskPromise = task()
        .then(() => {
          this.removeActiveTask(taskPromise); // Remove the task once it's done
          this.processQueue(); // Continue processing the queue
        })
        .catch((error) => {
          console.error('Task failed:', error); // Handle task error
          this.removeActiveTask(taskPromise);
          this.processQueue();
        });
  
      this.activeTasks.push(taskPromise); // Add the task to the list of active tasks
    }
  
    // Method to remove a task from the list of active tasks
    removeActiveTask(taskPromise) {
      this.activeTasks = this.activeTasks.filter(t => t !== taskPromise);
    }
  
    // Method to wait until all active tasks have completed
    async drain() {
      await Promise.all(this.activeTasks); // Wait for all active tasks to finish
    }
  }

  module.exports = QueueHandler;