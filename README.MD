# Context Manager

This project demonstrates a simple context management system using JavaScript. It allows you to create contexts, bind values to keys within those contexts, and retrieve those values in a controlled manner.

## Overview

The main components of this example are:

- **Context Creation**: You can create a new context using `Context.createContext()`.
- **Binding Values**: Values can be bound to keys in the context using the `bind` method.
- **Retrieving Values**: Values can be retrieved using the `get` method within a handler function that has access to the context.
- **Context Isolation**: The context is isolated to the handler, meaning that accessing the context outside of the handler will return `undefined`.

## How to Use

1. **Create a Context**: Use `Context.createContext()` to create a new context instance.
   
   ```javascript
   const theContext = Context.createContext();
   ```


1. **Bind Values**: Use the bind method to associate keys with values in the context.

    ```javascript
    theContext.bind("key1", "value1");
    theContext.bind("key2", "value2");
    ```

1. **Define a Handler**: Create a function that retrieves values from the context.

    ```javascript
    const theHandler = function() {
    const theContext = Context.getContext();
    const key2 = theContext.get("key2");
    console.log(key2); // Outputs: value2
    };
    ``` 


1. **Create a New Handler with Context**: Use containerWithContext to create a new handler that has access to the context.

    ```javascript
    const newHandler = theContext.containerWithContext(theHandler);
    newHandler(); // Call the handler with context
    ```

1. **Call the Handler Without Context**: If you call the handler directly without context, it will not have access to the bound values.

    ```javascript
    theHandler(); // Outputs: undefined
    ```

1. **Global Context Access**: Attempting to access the context globally will return undefined.

    ```javascript
    const anotherContext = Context.getContext(); // This will be undefined
    console.log('GLOBAL: anotherContext', anotherContext); // Outputs: undefined
    ```

