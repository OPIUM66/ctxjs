import Context from "./contextManager.js";
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const commandHandler = (command) => {
    const args = command.split(' ');
    const cmd = args[0];

    switch (cmd) {
        case 'create':
            const contextName = args[1];
            Context.createContext(contextName);
            console.log(`Context '${contextName}' created.`);
            break;
        case 'get':
            if (args[1] === 'all') {
                const contexts = Context.getAllContexts();

                console.log('');

                console.log('All Contexts:', `(${contexts.length})`);
                contexts.forEach(ctx => {
                    console.log('');
                    console.log(`ID:` , ctx.asyncId);
                    console.log(`NAME:`, ctx.name);
                    console.log(`DATA: (${ctx.data.length}): ${ctx.data}`);
                    
                });
            } else {
                const asyncId = parseInt(args[1]);
                const context = Context.getContextById(asyncId);
                console.log(`Context for Async ID ${asyncId}:`, context);
            }
            break;
        case 'bind':
            const key = args[1];
            const value = args[2];
            const contextId = parseInt(args[3]);
            const contextToBind = Context.getContextById(contextId);
            if (contextToBind) {
                contextToBind.bind(key, value);
                console.log(`Bound ${key}: ${value} to context ID ${contextId}.`);
            } else {
                console.log(`Context ID ${contextId} not found.`);
            }
            break;
        default:
            console.log('Unknown command.');
    }
};

rl.on('line', commandHandler);

// Call the debug method on the Context class without interval
// commands:
// create sampleContext --> ID: 18
// bind key value 18
// get all
// get 18
console.log('Console interface for context management. Type your commands:');
