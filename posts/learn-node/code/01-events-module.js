var events = require('events');
var customEvent = new events.EventEmitter();

// handler
var handleNodeLearned = () => console.log('Congrats, you learned Node!');

// listener
customEvent.on('nodeLearned', handleNodeLearned);

// fire events with emit()
customEvent.emit('nodeLearned');
