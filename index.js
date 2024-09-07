// const QueueHandler = require('./libs');


// module.exports = QueueHandler;


const QueueHandler = require('./lib/queueHandler');
const SystemMonitor = require('./lib/systemMonitor');

module.exports = {
    QueueHandler,
    SystemMonitor
};
