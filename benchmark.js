import { performance } from 'perf_hooks';
import fs from 'fs';
import Context from "./contextManager.js";

const context = Context.createContext();
const key = 'testKey';
const value = 'testValue';

// Function to log total memory usage in kilobytes
const logTotalMemoryUsage = () => {
    const memoryUsage = process.memoryUsage();
    const totalMemory = (memoryUsage.rss + memoryUsage.heapTotal + memoryUsage.heapUsed) / 1024; // Convert bytes to kilobytes
    return totalMemory.toFixed(2); // Return total memory in KB
};

// Benchmark function
const benchmark = async (fn, name, iterations = 1000) => {
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
        await fn();
    }

    const end = performance.now();
    const duration = end - start;
    const ops = iterations / (duration / 1000); // operations per second
    const totalMemory = logTotalMemoryUsage(); // Get total memory usage

    const result = {
        name,
        duration: duration.toFixed(3),
        iterations,
        ops: ops.toFixed(2),
        totalMemory: `${totalMemory} KB`
    };

    console.log();
    console.log('◻▫◻▫◻▫◻▫◻▫◻▫◻▫◻▫◻▫◻▫◻');
    
    // Log the result to the console
    console.log(`✅ ${name} took ⌛ ${result.duration} ms for 🔁 ${result.iterations} iterations`);
    console.log(`🧠 Operations per second: ${result.ops} ops`);
    console.log(`📂 Total Memory Usage: ${result.totalMemory}`);

    // meow, shhh...

    return result;
};

// Run benchmarks and log results to a file
const runBenchmarks = async () => {
    const results = [];

    results.push(await benchmark(() => Context.createContext(), 'Context.createContext'));
    results.push(await benchmark(() => Context.getContext(), 'Context.getContext'));
    results.push(await benchmark(() => context.bind(key, value), 'Context.bind'));
    results.push(await benchmark(() => context.get(key), 'Context.get'));
    results.push(await benchmark(() => context.unbind(key), 'Context.unbind'));

    // Write results to a log file
    const logData = results.map(result => 
        `${result.name}: ${result.duration} ms, ${result.iterations} iterations, ${result.ops} ops, Total Memory: ${result.totalMemory}`
    ).join('\n');

    fs.writeFileSync(`benchmark-${new Date().getTime()}.log`, logData);
    console.log();
    console.log('🆗 Benchmark results logged to ./benchmark.log');
};
console.log('📊 Starting benchmark...');
runBenchmarks();

