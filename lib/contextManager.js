import async_hooks from 'async_hooks';

class Context {
    static contexts = new Map();
    
    constructor(name, deleteAfter = true) {
        this.data = new Map();
        this.name = name;
        this.deleteAfter = deleteAfter;
        this.getByProperty = {};
    }

    static createContext(name, deleteAfter = true) {
        const context = new Context(name , deleteAfter);
        const asyncId = async_hooks.executionAsyncId();
        this.contexts.set(asyncId, context);
        return context;
    }

    bind(key, value) {
        this.data.set(key, value);
        this.getByProperty[key] = value;
    }

    unbind(key) {
        this.data.delete(key);
        delete this.getByProperty[key];
    }

    get(key) {
        return this.data.get(key);
    }

    static getContext() {
        const noopContext = () => {
            console.log('💥 No Context Found!...');
            return null;
        }
        const contextNotFound = () => {
            return { get: noopContext }
        }
        const asyncId = async_hooks.executionAsyncId();
        return this.contexts.get(asyncId) || contextNotFound();
    }

    static getAllContexts() {
        return Array.from(this.contexts.entries()).map(([asyncId, context]) => ({
            asyncId,
            name: context.name,
            data: Array.from(context.data.entries())
        }));
    }

    static getContextById(asyncId) {
        return this.contexts.get(asyncId);
    }

    containerWithContext(handler) {
        const context = this;
        return (...args) => {
            const asyncId = async_hooks.executionAsyncId();
            Context.contexts.set(asyncId, context);
            try {
                return handler.apply(this, args);
            } catch (error) {
                console.error('Error in handler:', error);
                throw error;
            } finally {
                if (this.deleteAfter) {
                    Context.contexts.delete(asyncId);
                }
            }
        };
    }

    static debug() {
        console.log('Current Contexts:', this.contexts.size);
        for (const [asyncId, context] of this.contexts.entries()) {
            console.log(`Async ID: ${asyncId}, Name: ${context.name}, Data:`, Array.from(context.data.entries()));
        }
    }
}

export default Context;
