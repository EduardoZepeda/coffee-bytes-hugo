import { useState, useEffect, useRef, useCallback } from 'preact/compat';
import css from './style.css?inline';
import { render } from 'preact';

const WorkerPoolVisualization = () => {
    const [workers, setWorkers] = useState([]);
    const [taskQueue, setTaskQueue] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [workerCount, setWorkerCount] = useState(4);
    const [taskInterval, setTaskInterval] = useState(1000);
    const [processTime, setProcessTime] = useState(2000);
    const [stats, setStats] = useState({
        totalTasks: 0,
        completedTasks: 0,
        failedTasks: 0,
        queueSize: 0
    });

    const intervalRef = useRef<number>(0);
    const taskIdRef = useRef(0);
    const isProcessingRef = useRef(false);

    // Initialize workers
    useEffect(() => {
        const newWorkers = Array.from({ length: workerCount }, (_, i) => ({
            id: i + 1,
            status: 'idle',
            currentTask: null,
            completedTasks: 0
        }));
        setWorkers(newWorkers);
    }, [workerCount]);

    // Task generation
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                const newTask = {
                    id: ++taskIdRef.current,
                    name: `Task ${taskIdRef.current}`,
                    createdAt: Date.now()
                };
                setTaskQueue(prev => [...prev, newTask]);
                setStats(prev => ({
                    ...prev,
                    totalTasks: prev.totalTasks + 1
                }));
            }, taskInterval);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, taskInterval]);

    // Process tasks (batched and guarded to avoid re-entrancy)
    useEffect(() => {
        if (isProcessingRef.current) return;
        if (taskQueue.length === 0) return;

        isProcessingRef.current = true;

        // We take a snapshot of the current queue length to compute assignments
        setWorkers(currentWorkers => {
            const idleWorkers = currentWorkers.filter(w => w.status === 'idle');
            const tasksToProcess = Math.min(idleWorkers.length, taskQueue.length);

            if (tasksToProcess === 0) {
                isProcessingRef.current = false;
                return currentWorkers;
            }

            const tasksToAssign = taskQueue.slice(0, tasksToProcess);

            // Schedule completion for each assignment once
            idleWorkers.slice(0, tasksToProcess).forEach((idleWorker, idx) => {
                const task = tasksToAssign[idx];
                setTimeout(() => {
                    const success = Math.random() > 0.1;

                    setWorkers(workers =>
                        workers.map(w =>
                            w.id === idleWorker.id
                                ? {
                                    ...w,
                                    status: success ? 'idle' : 'error',
                                    currentTask: null,
                                    completedTasks: success ? w.completedTasks + 1 : w.completedTasks
                                }
                                : w
                        )
                    );

                    setStats(prevStats => ({
                        ...prevStats,
                        completedTasks: prevStats.completedTasks + 1
                    }));

                    if (!success) {
                        setTimeout(() => {
                            setWorkers(workers =>
                                workers.map(w =>
                                    w.id === idleWorker.id && w.status === 'error'
                                        ? { ...w, status: 'idle' }
                                        : w
                                )
                            );
                        }, 1000);
                    }
                }, processTime);
            });

            // Update queue once per batch
            setTaskQueue(prev => prev.slice(tasksToProcess));

            // Return workers with assigned tasks (single render)
            const updated = currentWorkers.map(worker => {
                const idx = idleWorkers.findIndex(w => w.id === worker.id);
                if (idx >= 0 && idx < tasksToProcess) {
                    const task = tasksToAssign[idx];
                    return {
                        ...worker,
                        status: 'busy',
                        currentTask: task
                    };
                }
                return worker;
            });

            isProcessingRef.current = false;
            return updated;
        });
    }, [taskQueue, processTime, workers]);

    // Keep stats.queueSize in sync with the actual queue length
    useEffect(() => {
        setStats(prev => ({ ...prev, queueSize: taskQueue.length }));
    }, [taskQueue.length]);

    const toggleSimulation = () => setIsRunning(!isRunning);

    const resetSimulation = () => {
        setIsRunning(false);
        setTaskQueue([]);
        setStats({
            totalTasks: 0,
            completedTasks: 0,
            failedTasks: 0,
            queueSize: 0
        });
        taskIdRef.current = 0;
    };

    const addManualTask = () => {
        const newTask = {
            id: ++taskIdRef.current,
            name: `Manual Task ${taskIdRef.current}`,
            createdAt: Date.now()
        };
        setTaskQueue(prev => [...prev, newTask]);
        setStats(prev => ({
            ...prev,
            totalTasks: prev.totalTasks + 1
        }));
    };

    const Worker = ({ worker }) => {
        const baseClasses = "w-20 h-20 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 relative cursor-pointer text-sm";

        let statusClasses = "";
        let animationStyle = {};

        switch (worker.status) {
            case 'idle':
                statusClasses = "bg-green-400";
                animationStyle = {
                    animation: "pulse 2s infinite"
                };
                break;
            case 'busy':
                statusClasses = "bg-orange-600";
                animationStyle = {
                    animation: "bounce 1s infinite"
                };
                break;
            case 'error':
                statusClasses = "bg-red-600";
                animationStyle = {
                    animation: "shake 0.5s ease-in-out"
                };
                break;
        }

        return (
            <div className={`${baseClasses} ${statusClasses}`} style={animationStyle}>
                W{worker.id}
                {worker.currentTask && (
                    <div className="absolute -top-6 text-xs bg-black bg-opacity-80 text-white px-2 py-1 rounded whitespace-nowrap">
                        {worker.currentTask.name}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes bounce {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(2px, 2px) rotate(2deg); }
          50% { transform: translate(0, 0) rotate(0deg); }
          75% { transform: translate(-2px, 2px) rotate(-2deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>

            <div className="bg-gray-600 rounded-xl overflow-hidden">
                <div className="flex gap-0.5 flex-wrap">
                    {/* Left Panel */}
                    <div className="w-full p-5 overflow-y-auto bg-opacity-95 backdrop-blur-sm">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-5 mb-5">
                            <h2 className="text-2xl font-bold text-gray-800 mb-5">Worker Pool Controls</h2>

                            <div className="mb-4">
                                <label className="block mb-2 font-semibold text-gray-700">
                                    Workers: {workerCount}
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="8"
                                    value={workerCount}
                                    onChange={(e) => setWorkerCount(parseInt(e.target.value))}
                                    disabled={isRunning}
                                    className="w-full mb-2 accent-purple-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 font-semibold text-gray-700">
                                    Task Interval: {taskInterval}ms
                                </label>
                                <input
                                    type="range"
                                    min="500"
                                    max="3000"
                                    step="100"
                                    value={taskInterval}
                                    onChange={(e) => setTaskInterval(parseInt(e.target.value))}
                                    className="w-full mb-2 accent-purple-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 font-semibold text-gray-700">
                                    Process Time: {processTime}ms
                                </label>
                                <input
                                    type="range"
                                    min="1000"
                                    max="5000"
                                    step="100"
                                    value={processTime}
                                    onChange={(e) => setProcessTime(parseInt(e.target.value))}
                                    className="w-full mb-2 accent-purple-500"
                                />
                            </div>

                            <div className="space-y-2 sm:space-y-0 sm:space-x-2 sm:flex">
                                <button
                                    onClick={toggleSimulation}
                                    className="bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isRunning ? 'Stop' : 'Start'} Auto Tasks
                                </button>
                                <button
                                    onClick={addManualTask}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:-translate-y-0.5 transition-transform"
                                >
                                    Add Task
                                </button>
                                <button
                                    onClick={resetSimulation}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:-translate-y-0.5 transition-transform"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-5 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-5">Worker Pool</h3>
                            <div className="flex gap-4 flex-wrap mb-8">
                                {workers.map(worker => (
                                    <Worker key={worker.id} worker={worker} />
                                ))}
                            </div>

                            <div className="bg-slate-50 rounded-lg p-4 mb-5">
                                <div className="font-semibold mb-3 text-gray-700">
                                    Task Queue ({taskQueue.length} items)
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {taskQueue.slice(0, 10).map(task => (
                                        <div
                                            key={task.id}
                                            className="bg-blue-700 text-white px-3 py-2 rounded-md text-xs font-semibold slide-in"
                                        >
                                            {task.name}
                                        </div>
                                    ))}
                                    {taskQueue.length > 10 && (
                                        <div className="bg-gray-500 text-white px-3 py-2 rounded-md text-xs font-semibold">
                                            +{taskQueue.length - 10} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="w-full p-5 overflow-y-auto bg-black bg-opacity-85 text-white">
                        <h2 className="text-2xl font-bold mb-5">Worker Pool Pattern</h2>

                        <div className="grid grid-cols-2 gap-4 mb-8 text-gray-800">
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg text-center">
                                <span className="text-2xl font-bold block">{stats.totalTasks}</span>
                                <span className="text-sm opacity-80">Total Tasks</span>
                            </div>
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg text-center">
                                <span className="text-2xl font-bold block">{stats.completedTasks}</span>
                                <span className="text-sm opacity-80">Completed</span>
                            </div>
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg text-center">
                                <span className="text-2xl font-bold block">{stats.queueSize}</span>
                                <span className="text-sm opacity-80">In Queue</span>
                            </div>
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg text-center">
                                <span className="text-2xl font-bold block">
                                    {workers.filter(w => w.status === 'busy').length}
                                </span>
                                <span className="text-sm opacity-80">Active Workers</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">How it Works</h3>
                            <p className="mb-4">
                                The Worker Pool pattern manages a fixed number of worker threads to process tasks concurrently:
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li><strong className="text-green-400">Green workers</strong> are idle and ready for tasks</li>
                                <li><strong className="text-amber-400">Orange workers</strong> are busy processing tasks</li>
                                <li><strong className="text-red-400">Red workers</strong> encountered an error (10% chance)</li>
                                <li>Tasks wait in queue until a worker becomes available</li>
                                <li>Pool size limits resource usage and prevents system overload</li>
                            </ul>
                        </div>

                        <div className="bg-slate-800 rounded-lg p-5 font-mono text-sm">
                            <div className="text-amber-400 mb-2">// Worker Pool Pattern Example</div>
                            <div className="text-blue-400">class</div> <span className="text-white">WorkerPool</span> {`{`}
                            <br />
                            &nbsp;&nbsp;<div className="text-blue-400 inline">constructor</div><span className="text-white">(poolSize)</span> {`{`}
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<div className="text-white inline">this.workers = [];</div>
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<div className="text-white inline">this.taskQueue = [];</div>
                            <br />
                            &nbsp;&nbsp;{`}`}
                            <br />
                            <br />
                            &nbsp;&nbsp;<div className="text-blue-400 inline">async</div> <div className="text-green-400 inline">processTask</div><span className="text-white">(task)</span> {`{`}
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<div className="text-gray-400 inline">// Find available worker</div>
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<div className="text-blue-400 inline">const</div> <span className="text-white">worker = this.getIdleWorker();</span>
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<div className="text-blue-400 inline">return</div> <span className="text-white">worker.execute(task);</span>
                            <br />
                            &nbsp;&nbsp;{`}`}
                            <br />
                            {`}`}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function renderWorkerPool() {
    if (document.getElementById("app-worker-pool")) {
        document.body.addEventListener('htmx:afterSettle', renderWorkerPool);
        document.body.addEventListener('htmx:historyRestore', renderWorkerPool);
        render(<><style dangerouslySetInnerHTML={{ __html: css }} /><WorkerPoolVisualization /></>, document.getElementById('app-worker-pool').attachShadow({ mode: 'open' }));
    }
    return;
}
