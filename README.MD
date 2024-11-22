# Context Manager

This project demonstrates a simple context management system using JavaScript. It allows you to create contexts, bind values to keys within those contexts, and retrieve those values within a handler function.

## Overview

The main components of this example are:

- **Context Creation**: You can create a new context using `Context.createContext()`.
- **Binding Values**: Values can be bound to keys in the context using the `bind` method.
- **Retrieving Values**: Values can be retrieved using the `get` method within a handler function that has access to the context.
- **Context Isolation**: The context is isolated to the handler, meaning that accessing the context outside of the handler will return `undefined`.

## How to Use

0. **Import the Context Module**:

    ```javascript
        import Context from 'the-context-js';
        // OR ||
        const { default: Context } = require("the-context-js");
    ```

1. **Create a Context**: Use `Context.createContext()` to create a new context instance.
   
   ```javascript
   const theContext = Context.createContext();
   ```


2. **Bind Values**: Use the bind method to associate keys with values in the context.

    ```javascript
    theContext.bind("key1", "value1");
    theContext.bind("key2", "value2");
    ```

3. **Define a Handler**: Create a function that retrieves values from the context.

    ```javascript
    const theHandler = function() {
    const theContext = Context.getContext();
    const key2 = theContext.get("key2");
    console.log(key2); // Outputs: value2
    };
    ``` 


4. **Create a New Handler with Context**: Use containerWithContext to create a new handler that has access to the context.

    ```javascript
    const newHandler = theContext.containerWithContext(theHandler);
    newHandler(); // Call the handler with context
    ```

5. **Call the Handler Without Context**: If you call the handler directly without context, it will not have access to the bound values.

    ```javascript
    theHandler(); // Outputs: undefined
    ```

6. **Global Context Access**: Attempting to access the context globally will return undefined.

    ```javascript
    const anotherContext = Context.getContext(); // This will be undefined
    console.log('GLOBAL: anotherContext', anotherContext); // Outputs: undefined
    ```



## Benchmark

- **Run a benchmark**:
`node --expose-gc benchmark.js`
```
Last Reports:
Context.createContext: 1.625 ms, 1000 iterations, 615498.25 ops, Total Memory: 42544.00 KB
Context.getContext: 0.581 ms, 1000 iterations, 1720282.13 ops, Total Memory: 43412.88 KB
Context.bind: 0.845 ms, 1000 iterations, 1183431.95 ops, Total Memory: 43998.81 KB
Context.get: 0.253 ms, 1000 iterations, 3955696.20 ops, Total Memory: 44259.15 KB
Context.unbind: 0.342 ms, 1000 iterations, 2924831.82 ops, Total Memory: 44528.48 KB
```

## Debugging

- **Monitor Contexts**:
`node debug.js`

```
Commands:

1. create sampleContext --> ID: 18
2. bind key value 18
3. get all
4. get 18
```







