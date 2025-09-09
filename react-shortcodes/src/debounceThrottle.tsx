import { render } from 'preact';

import css from './style.css?inline';

import { useState, useEffect, useCallback, useRef } from 'preact/compat';

const animals = ['🐄', '🐑', '🐷', '🐓', '🐎', '🐐', '🦆', '🐰'];

const DebounceThrottleDemo = () => {
    const [debounceDelay, setDebounceDelay] = useState(500);
    const [throttleDelay, setThrottleDelay] = useState(500);
    const [inputValue, setInputValue] = useState('');

    const [debounceAnimals, setDebounceAnimals] = useState([]);
    const [throttleAnimals, setThrottleAnimals] = useState([]);

    const [debounceStats, setDebounceStats] = useState({ calls: 0, executions: 0 });
    const [throttleStats, setThrottleStats] = useState({ calls: 0, executions: 0 });

    const debounceTimeoutRef = useRef(null);
    const throttleLastExecRef = useRef(0);
    const throttleTimeoutRef = useRef(null);

    // Debounce function
    const debounce = useCallback((func, delay) => {
        return (...args) => {
            setDebounceStats(prev => ({ ...prev, calls: prev.calls + 1 }));

            clearTimeout(debounceTimeoutRef.current);
            debounceTimeoutRef.current = setTimeout(() => {
                func(...args);
                setDebounceStats(prev => ({ ...prev, executions: prev.executions + 1 }));
            }, delay);
        };
    }, []);

    // Throttle function
    const throttle = useCallback((func, delay) => {
        return (...args) => {
            setThrottleStats(prev => ({ ...prev, calls: prev.calls + 1 }));

            const now = Date.now();

            if (now - throttleLastExecRef.current >= delay) {
                func(...args);
                setThrottleStats(prev => ({ ...prev, executions: prev.executions + 1 }));
                throttleLastExecRef.current = now;
            }
        };
    }, []);

    // Add animal to farmyard
    const addAnimalToFarmyard = (setAnimals) => {
        const animal = animals[Math.floor(Math.random() * animals.length)];
        const id = Date.now() + Math.random();
        const newAnimal = {
            id,
            emoji: animal,
            x: Math.random() * 80 + 5,
            y: Math.random() * 60 + 20
        };

        setAnimals(prev => [...prev, newAnimal]);

        // Remove animal after 2 seconds
        setTimeout(() => {
            setAnimals(prev => prev.filter(a => a.id !== id));
        }, 2000);
    };

    // Create debounced and throttled functions
    const debouncedAddAnimal = useCallback(
        debounce(() => addAnimalToFarmyard(setDebounceAnimals), debounceDelay),
        [debounce, debounceDelay]
    );

    const throttledAddAnimal = useCallback(
        throttle(() => addAnimalToFarmyard(setThrottleAnimals), throttleDelay),
        [throttle, throttleDelay]
    );

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Trigger both debounced and throttled functions
        debouncedAddAnimal();
        throttledAddAnimal();
    };

    // Reset stats when delays change
    useEffect(() => {
        setDebounceStats({ calls: 0, executions: 0 });
    }, [debounceDelay]);

    useEffect(() => {
        setThrottleStats({ calls: 0, executions: 0 });
    }, [throttleDelay]);

    const resetDemo = () => {
        setInputValue('');
        setDebounceAnimals([]);
        setThrottleAnimals([]);
        setDebounceStats({ calls: 0, executions: 0 });
        setThrottleStats({ calls: 0, executions: 0 });
        clearTimeout(debounceTimeoutRef.current);
        clearTimeout(throttleTimeoutRef.current);
    };

    return (
        <>
            <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .animal-entering {
          animation: bounce 0.5s ease;
        }
        .fence-pattern {
          background: repeating-linear-gradient(
            90deg,
            #8B4513 0px,
            #8B4513 8px,
            #D2691E 8px,
            #D2691E 12px
          );
        }
      `}</style>

            <div className="max-w-6xl mx-auto p-5 bg-green-100 rounded-2xl text-white font-sans">
                <h1 className="text-center text-4xl mb-3 font-bold drop-shadow-lg text-gray-800">
                    🚜 Farmyard Demo: Debounce vs Throttle
                </h1>
                <p className="text-center text-lg mb-8 opacity-90 text-gray-600">
                    Type in the input below to see how debounce and throttle control when animals appear in the farmyard!
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Debounce Panel */}
                    <div className="bg-slate-800 bg-opacity-20 backdrop-blur-lg rounded-xl p-5 hover:-translate-y-1 transition-transform duration-300">
                        <h2 className="text-2xl font-bold text-center mb-4">🐌 Debounce</h2>

                        {/* Farmyard */}
                        <div className="h-48 bg-sky-300 rounded-lg relative overflow-hidden mb-4 shadow-lg">
                            <div className="absolute inset-0 bg-green-300" style={{ top: '50%' }}></div>
                            <div className="absolute inset-0 bg-green-600" style={{ top: '75%' }}></div>

                            {/* Fence */}
                            <div className="fence-pattern absolute bottom-0 left-0 right-0 h-8"></div>

                            {/* Animals */}
                            {debounceAnimals.map(animal => (
                                <div
                                    key={animal.id}
                                    className="animal-entering absolute text-3xl transition-all duration-300 cursor-pointer"
                                    style={{
                                        left: `${animal.x}%`,
                                        top: `${animal.y}%`
                                    }}
                                >
                                    {animal.emoji}
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-700 bg-opacity-20 p-4 rounded-lg mb-4">
                            <div className="mb-4">
                                <label className="block mb-2 font-bold">Delay: {debounceDelay}ms</label>
                                <input
                                    type="range"
                                    min={100}
                                    max={1000}
                                    step={50}
                                    value={debounceDelay}
                                    onChange={(e) => setDebounceDelay(parseInt(e.target.value))}
                                    className="w-full accent-purple-500 bg-white text-gray-500"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-3 text-sm">
                                <div className="bg-slate-700 bg-opacity-30 p-2 rounded text-center">
                                    <div>Function Calls</div>
                                    <div className="font-bold text-lg">{debounceStats.calls}</div>
                                </div>
                                <div className="bg-slate-700 bg-opacity-30 p-2 rounded text-center">
                                    <div>Animals Spawned</div>
                                    <div className="font-bold text-lg">{debounceStats.executions}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Throttle Panel */}
                    <div className="bg-slate-800 bg-opacity-20 backdrop-blur-lg rounded-xl p-5 hover:-translate-y-1 transition-transform duration-300">
                        <h2 className="text-2xl font-bold text-center mb-4">⚡ Throttle</h2>

                        {/* Farmyard */}
                        <div className="h-48 bg-sky-300 rounded-lg relative overflow-hidden mb-4 shadow-lg">
                            <div className="absolute inset-0 bg-green-300" style={{ top: '50%' }}></div>
                            <div className="absolute inset-0 bg-green-600" style={{ top: '75%' }}></div>

                            {/* Fence */}
                            <div className="fence-pattern absolute bottom-0 left-0 right-0 h-8"></div>

                            {/* Animals */}
                            {throttleAnimals.map(animal => (
                                <div
                                    key={animal.id}
                                    className="animal-entering absolute text-3xl transition-all duration-300 cursor-pointer"
                                    style={{
                                        left: `${animal.x}%`,
                                        top: `${animal.y}%`
                                    }}
                                >
                                    {animal.emoji}
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-700 bg-opacity-20 p-4 rounded-lg mb-4">
                            <div className="mb-4">
                                <label className="block mb-2 font-bold">Delay: {throttleDelay}ms</label>
                                <input
                                    type="range"
                                    min={100}
                                    max={1000}
                                    step={50}
                                    value={throttleDelay}
                                    onChange={(e) => setThrottleDelay(parseInt(e.target.value))}
                                    className="w-full accent-purple-500"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-3 text-sm">
                                <div className="bg-slate-700 bg-opacity-30 p-2 rounded text-center">
                                    <div>Function Calls</div>
                                    <div className="font-bold text-lg">{throttleStats.calls}</div>
                                </div>
                                <div className="bg-slate-700 bg-opacity-30 p-2 rounded text-center">
                                    <div>Animals Spawned</div>
                                    <div className="font-bold text-lg">{throttleStats.executions}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input Control */}
                <div className="bg-slate-700 bg-opacity-20 p-5 rounded-lg mb-5">
                    <div className="mb-4">
                        <label className="block mb-2 font-bold text-lg">🌾 Type here to trigger animal spawning:</label>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Start typing to see the magic happen..."
                            className="w-full p-3 rounded-lg text-gray-500 text-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <button
                        onClick={resetDemo}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
                    >
                        🔄 Reset Demo
                    </button>
                </div>

                {/* Explanation */}
                <div className="bg-slate-800 bg-opacity-20 backdrop-blur-lg p-5 rounded-xl text-white">
                    <h3 className="text-xl font-bold mb-4 text-amber-500">📚 How it Works</h3>

                    <div className="space-y-4">
                        <p>
                            <strong className="text-amber-400">🐌 Debounce:</strong> Waits for a pause in activity before executing.
                            Animals only appear after you stop typing for the specified delay. Perfect for search suggestions or API calls.
                        </p>

                        <p>
                            <strong className="text-amber-400">⚡ Throttle:</strong> Executes at most once per time interval,
                            regardless of how many times it's called. Animals appear at regular intervals while you type.
                            Great for scroll events or button click protection.
                        </p>

                        <p>
                            <strong className="text-amber-400">💡 Key Difference:</strong> Debounce resets the timer on each call,
                            while throttle maintains a consistent execution rate. Watch the "Function Calls" vs "Animals Spawned"
                            to see the difference!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};


function renderBounceVsThrottle() {
    if (document.getElementById("app-debounce-vs-throttle")) {
        document.body.addEventListener('htmx:afterSettle', renderBounceVsThrottle);
        document.body.addEventListener('htmx:historyRestore', renderBounceVsThrottle);
        render(<><style dangerouslySetInnerHTML={{ __html: css }} /><DebounceThrottleDemo /></>, document.getElementById('app-debounce-vs-throttle').attachShadow({ mode: 'open' }));
    }
    return;
}

export default renderBounceVsThrottle;

