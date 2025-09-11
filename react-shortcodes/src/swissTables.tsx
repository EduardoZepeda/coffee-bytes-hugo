import { useState, useCallback } from 'preact/compat';
import { render } from 'preact';

import css from './style.css?inline';

const SwissTableSimulator = () => {
    const [groups, setGroups] = useState([
        {
            id: 0,
            controlWord: new Array(8).fill({ state: 'empty', h2: 0 }),
            slots: new Array(8).fill({ key: '', value: '', hash: '', h1: '', h2: '' })
        },
        {
            id: 1,
            controlWord: new Array(8).fill({ state: 'empty', h2: 0 }),
            slots: new Array(8).fill({ key: '', value: '', hash: '', h1: '', h2: '' })
        }
    ]);

    const [inputKey, setInputKey] = useState('');
    const [inputValue, setInputValue] = useState('');

    // Simple hash function for demonstration
    const hashString = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    };

    const insert = useCallback(() => {
        if (!inputKey || !inputValue) return;
    
        const fullHash = hashString(inputKey);
        const hashBinary = fullHash.toString(2).padStart(64, '0');
        const h1 = parseInt(hashBinary.slice(0, 57), 2);
        const h2 = parseInt(hashBinary.slice(57), 2);
        const groupIndex = h1 % 2;
    
        setGroups(prevGroups => {
            const newGroups = [...prevGroups];
            const targetGroup = { ...newGroups[groupIndex] };
    
            // First, check if key already exists
            const existingKeyIndex = targetGroup.slots.findIndex(
                (slot, idx) => 
                    targetGroup.controlWord[idx].state === 'occupied' && 
                    slot.key === inputKey
            );
    
            if (existingKeyIndex !== -1) {
                // Key exists, update its value
                targetGroup.slots = [...targetGroup.slots];
                targetGroup.slots[existingKeyIndex] = {
                    ...targetGroup.slots[existingKeyIndex],
                    value: inputValue
                };
                newGroups[groupIndex] = targetGroup;
                return newGroups;
            }
    
            // If key doesn't exist, find first empty or deleted slot
            let slotIndex = -1;
            for (let i = 0; i < 8; i++) {
                if (targetGroup.controlWord[i].state === 'empty' || 
                    targetGroup.controlWord[i].state === 'deleted') {
                    slotIndex = i;
                    break;
                }
            }
    
            if (slotIndex === -1) {
                alert('Group is full!');
                return prevGroups;
            }
    
            // Insert new key-value pair
            targetGroup.controlWord = [...targetGroup.controlWord];
            targetGroup.controlWord[slotIndex] = { state: 'occupied', h2 };
    
            targetGroup.slots = [...targetGroup.slots];
            targetGroup.slots[slotIndex] = {
                key: inputKey,
                value: inputValue,
                hash: fullHash.toString(),
                h1: h1.toString(),
                h2: h2.toString()
            };
    
            newGroups[groupIndex] = targetGroup;
            return newGroups;
        });
    
        setInputKey('');
        setInputValue('');
    }, [inputKey, inputValue]);

    const deleteKey = useCallback((groupIndex, slotIndex) => {
        setGroups(prevGroups => {
            const newGroups = [...prevGroups];
            const targetGroup = { ...newGroups[groupIndex] };

            targetGroup.controlWord = [...targetGroup.controlWord];
            targetGroup.controlWord[slotIndex] = { state: 'deleted', h2: 0 };

            targetGroup.slots = [...targetGroup.slots];
            targetGroup.slots[slotIndex] = { key: '', value: '', hash: '', h1: '', h2: '' };

            newGroups[groupIndex] = targetGroup;
            return newGroups;
        });
    }, []);

    const getStateColor = (state) => {
        switch (state) {
            case 'empty': return 'bg-gray-200 border-gray-300';
            case 'occupied': return 'bg-green-200 border-green-400';
            case 'deleted': return 'bg-red-200 border-red-400';
            default: return 'bg-gray-200 border-gray-300';
        }
    };

    const getStateText = (state) => {
        switch (state) {
            case 'empty': return 'E';
            case 'occupied': return 'O';
            case 'deleted': return 'D';
            default: return 'E';
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white">
            <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Swiss Table Visual Simulator</h3>
                <p className="text-gray-600 mb-4">
                    A visual representation of Swiss Tables hash implementation with 2 groups of 8 slots each.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-blue-800 mb-2">How it works:</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Hash is split: first 57 bits (H1) select the group, last 7 bits (H2) stored in control word</li>
                        <li>• Each group has 8 slots and a 64-bit control word (8 bytes)</li>
                        <li>• Control byte format: 1 bit for state (Empty/Occupied/Deleted) + 7 bits for H2</li>
                        <li>• Linear probing within the group for collision resolution</li>
                    </ul>
                </div>

                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Key"
                        value={inputKey}
                        onChange={(e) => setInputKey(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Value"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={insert}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Insert
                    </button>
                </div>
            </div>

            <div className="space-y-8">
                {groups.map((group) => (
                    <div key={group.id} className="border-2 border-gray-300 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Group {group.id}
                        </h3>

                        {/* Control Word */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-3 text-gray-700">Control Word (64 bits)</h3>
                            <div className="grid grid-cols-8 gap-2">
                                {group.controlWord.map((control, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-xs text-gray-500 mb-1">Byte {idx}</div>
                                        <div className={`p-3 rounded border-2 ${getStateColor(control.state)} transition-colors`}>
                                            <div className="font-bold text-sm">{getStateText(control.state)}</div>
                                            <div className="text-xs mt-1">
                                                {control.state === 'occupied' ? `H2:${control.h2}` : '---'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Slots */}
                        <div>
                            <h3 className="text-lg font-medium mb-3 text-gray-700">Data Slots</h3>
                            <div className="grid grid-cols-4 gap-4">
                                {group.slots.map((slot, idx) => (
                                    <div key={idx} className={`p-4 rounded-lg border-2 transition-colors ${slot.key ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                                        }`}>
                                        <div className="text-sm font-medium text-gray-600 mb-2">Slot {idx}</div>
                                        {slot.key ? (
                                            <div className="space-y-2">
                                                <div className="font-semibold text-green-800">
                                                    {slot.key}: {slot.value}
                                                </div>
                                                <div className="text-xs text-gray-600 space-y-1">
                                                    <div>Hash: ...{slot.hash.slice(-8)}</div>
                                                    <div>H1: ...{slot.h1.slice(-4)}</div>
                                                    <div>H2: {slot.h2}</div>
                                                </div>
                                                <button
                                                    onClick={() => deleteKey(group.id, idx)}
                                                    className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-gray-400 text-sm">Empty</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Legend:</h3>
                <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
                        <span>Empty (E)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-200 border border-green-400 rounded"></div>
                        <span>Occupied (O)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-200 border border-red-400 rounded"></div>
                        <span>Deleted (D)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

function renderSwissTable() {
    if (document.getElementById("app-swiss-table")) {
        document.body.addEventListener('htmx:afterSettle', renderSwissTable);
        document.body.addEventListener('htmx:historyRestore', renderSwissTable);
        render(<><style dangerouslySetInnerHTML={{ __html: css }} /><SwissTableSimulator /></>, document.getElementById('app-swiss-table').attachShadow({ mode: 'open' }));
    }
    return;
}

export default renderSwissTable;