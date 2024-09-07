
# Task Runner

A simple task queue handler that runs synchronous and asynchronous tasks, optimized for system resource usage. This package allows you to queue tasks and run them concurrently while monitoring CPU and memory usage to ensure system performance remains optimal.

## Features

- **Task Queue Management**: Add tasks to a queue and manage their execution.
- **Concurrency Control**: Set a concurrency limit to run multiple tasks in parallel.
- **System Monitoring**: Monitors CPU and memory usage to ensure that the system is not overloaded.
- **Resource Management**: Prevent tasks from being executed when system resource utilization exceeds a predefined threshold.

## Installation

To install the `concurrency-handler` package, use npm:

```bash
npm install concurrency-handler
```

## Usage
### Importing the Module
You can import both the `QueueHandler` and `SystemMonitor` classes from the package.

```bash
const { QueueHandler, SystemMonitor } = require('concurrency-handler');
```


### Example: QueueHandler
Here’s a basic example of how to use the `QueueHandler` to manage tasks.

```bash
const { QueueHandler } = require('concurrency-handler');

// Create a queue handler with specific concurrency and system resource limits
const queue = new QueueHandler({
    concurrency: 4, // Run up to 4 tasks in parallel
    maxCpuUtilization: 70, // Prevent new tasks if CPU usage exceeds 70%
    maxMemoryUtilization: 75 // Prevent new tasks if memory usage exceeds 75%
});

// Example tasks (can be async or sync functions)
const task1 = async () => {
    console.log('Task 1 is running');
    return new Promise((resolve) => setTimeout(resolve, 1000));
};

const task2 = async () => {
    console.log('Task 2 is running');
    return new Promise((resolve) => setTimeout(resolve, 1000));
};

// Add tasks to the queue
queue.addTasks([task1, task2]);

```

### Example: SystemMonitor
You can also use the `SystemMonitor` class independently to monitor system resources.

```bash
const { SystemMonitor } = require('concurrency-handler');

// Create a system monitor instance
const monitor = new SystemMonitor({
    maxCpuUtilization: 80, // Maximum allowed CPU usage (percentage)
    maxMemoryUtilization: 80 // Maximum allowed memory usage (percentage)
});

// Check CPU and Memory usage
console.log('CPU Usage:', monitor.getCpuUsage());
console.log('Memory Usage:', monitor.getMemoryUsage());

// Use the canProceed method to check if tasks can run
const canRunTasks = await monitor.canProceed([], 4);
if (canRunTasks) {
    console.log('System resources are sufficient to proceed with tasks.');
}

```


## API Reference

#### QueueHandler
`Constructor`
```bash
new QueueHandler({ concurrency, maxCpuUtilization, maxMemoryUtilization })
```



- ***`concurrency`*** (optional): The maximum number of tasks that can run in parallel. If not specified, defaults to the number of available CPU cores..
- ***`maxCpuUtilization`***(optional): The maximum CPU usage percentage allowed before pausing task execution. If not specified, defaults to 80%.
- ***`maxMemoryUtilization`***(optional): The maximum memory usage percentage allowed before pausing task execution. If not specified, defaults to 80%.

#### Methods
- ***`addTasks(tasks: Array<Function>)`***: Adds tasks to the queue and starts processing them. The tasks array should contain functions that return a Promise or synchronous functions.
- ***`processQueue()`***: Starts processing the tasks in the queue. It will continue to process tasks until the queue is empty and all active tasks are complete.
- ***`runTask(task: Function)`***: Runs a single task. This method is called internally by processQueue to execute tasks.





#### SystemMonitor
`Constructor`
```bash
new SystemMonitor({ maxCpuUtilization, maxMemoryUtilization })
```


#### Methods
- ***`getCpuUsage()`***: Returns the current CPU usage as a percentage.
- ***`getMemoryUsage()`***: Returns the current memory usage as a percentage.

- ***`canProceed(activeTasks: Array<Promise>, concurrency: number): Promise<boolean>`***: Returns a boolean indicating whether system resources allow further task execution.

