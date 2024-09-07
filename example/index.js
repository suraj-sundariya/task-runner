const { QueueHandler, SystemMonitor } = require('../index')
// import QueueHandler from '../src/index.js'

// const queue = new QueueHandler({
//     concurrency: 2,
//     maxCpuUtilization: 75,
//     maxMemoryUtilization: 70
// });

// const task0 = () => new Promise(resolve => setTimeout(() => {
//     console.log('Task 1 done');
//     resolve();
// }, 1000));

// const task2 = () => new Promise(resolve => {
//     console.log('Task 2 done');
//     resolve();
// });

// const task3 = () => new Promise(resolve => {
//     console.log('Task 3 done');
//     resolve();
// });
// const task4 = () => new Promise(resolve => {
//     console.log('Task 2 done');
//     resolve();
// });

// const task5 = () => new Promise(resolve => {
//     console.log('Task 3 done');
//     resolve();
// });
// const task6 = () => new Promise(resolve => {
//     console.log('Task 2 done');
//     resolve();
// });

// const task7 = () => new Promise(resolve => {
//     console.log('Task 3 done');
//     resolve();
// });
// const task8 = () => new Promise(resolve => {
//     console.log('Task 2 done');
//     resolve();
// });

// const task9 = () => new Promise(resolve => {
//     console.log('Task 3 done');
//     resolve();
// });

// const task10 = () => new Promise(resolve => {
//     console.log('Task 3 done');
//     resolve();
// });
// const task11 = () => new Promise(resolve => {
//     console.log('Task 2 done');
//     resolve();
// });

// const task12 = () => new Promise(resolve => {
//     console.log('Task 3 done');
//     resolve();
// });

// // queue.addTask(task1);
// // queue.addTask(task2);
// // queue.addTask(task3);

// // queue.addTasks([task1, task2, task3, task4,  task5, task6, task6, task7, task8, task9,  task10, task11, task12])
// // await queue.addTasks([task1, task1, task1, task1, task1, task1, task1, task1, task1, task1, task1, task1, task1, task1, task1, task1])



// const task1 = (count) => new Promise(resolve => setTimeout(() => {
//     console.log('Task done', count);
//     resolve();
// }, 1000));

// // Adding multiple tasks to test concurrency
// async function run() {
//     await queue.addTasks([task1, task1, task1, task1, task1, task1, task1, task1, task1, task1, task1, task1, task1, task1, task1, task1]);
// }
// run();


// Graceful exit handling
process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code:', code);
});

process.on('exit', (code) => {
    console.log('Process exit event with code:', code);
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Graceful shutdown
    process.exit(1);
});

// Catch uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Graceful shutdown
    process.exit(1);
});



// Example usage
const task1 = () => new Promise(resolve => setTimeout(() => {
  console.log('Task 1 done');
  resolve();
}, 1000));

const task2 = () => new Promise(resolve => setTimeout(() => {
  console.log('Task 2 done');
  resolve();
}, 1500));

const task3 = () => new Promise(resolve => setTimeout(() => {
  console.log('Task 3 done');
  resolve();
}, 500));

const task4 = () => new Promise(resolve => setTimeout(() => {
  console.log('Task 4 done');
  resolve();
}, 2000));
const systemMonitor = new SystemMonitor({ maxCpuUtilization: 70, maxMemoryUtilization: 75 });
const queue = new QueueHandler({concurrency: 4, maxCpuUtilization: 80, maxMemoryUtilization: 80 }); // Create a QueueHandler with concurrency of 4
console.log('CPU Usage 1:', systemMonitor.getCpuUsage());
console.log('Memory Usage 1:', systemMonitor.getMemoryUsage());
queue.addTasks([task1, task2, task3, task4, task1, task2, task3, task4]);

console.log(' CPU uses after task processing ');
console.log('CPU Usagen 2 :', systemMonitor.getCpuUsage());
console.log('Memory Usage 2:', systemMonitor.getMemoryUsage());