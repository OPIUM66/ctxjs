import async_hooks from 'async_hooks';

class Context {
    static contexts = new Map();

    constructor() {
        this.data = new Map();
    }

    static createContext() {
        const context = new Context();
        const asyncId = async_hooks.executionAsyncId();
        this.contexts.set(asyncId, context);
        return context;
    }

    bind(key, value) {
        this.data.set(key, value);
    }

    unbind(key) {
        this.data.delete(key);
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
                Context.contexts.delete(asyncId);
            }
        };
    }
}

export default Context;

