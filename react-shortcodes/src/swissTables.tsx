import { useState, useCallback } from 'preact/compat';
import { render } from 'preact';

import css from './style.css?inline';


type swissGroups = {
    id: number,
    controlWord: Array<state>,
    slots: Array<metadata>,
}

type state = {
    state: string,
    h2: number,
}

type metadata = {
    key: string,
    value: string,
    hash: string,
    h1: string,
    h2: string,
}

const SwissTableSimulator = () => {
    const [groups, setGroups] = useState<Array<swissGroups>>([
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
    const [searchKey, setSearchKey] = useState('');
    const [searchState, setSearchState] = useState({
        isSearching: false,
        currentIndex: -1,
        currentH2: null as number | null,
        targetH2: null as number | null,
        targetGroup: -1,
        matchedIndices: [] as number[],
        found: false,
        result: null as { groupIndex: number, slotIndex: number, value: string } | null,
        isComparing: false,
        comparisons: [] as { index: number, h2: number | null, isMatch: boolean }[]
    });

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

    const searchKeyInTable = useCallback(async () => {
        if (!searchKey) return;

        // Reset search state
        setSearchState({
            isSearching: true,
            currentIndex: -1,
            currentH2: null,
            targetH2: null,
            targetGroup: -1,
            matchedIndices: [],
            found: false,
            result: null,
            isComparing: false,
            comparisons: []
        });

        try {
            // Calculate hash and h2 for the search key
            const fullHash = hashString(searchKey);
            const h2 = parseInt(fullHash.toString(2).padStart(64, '0').slice(57), 2);
            const h1 = parseInt(fullHash.toString(2).padStart(64, '0').slice(0, 57), 2);
            const groupIndex = h1 % groups.length; // Determine target group

            // Show the target H2 and group we're looking in
            setSearchState(prev => ({
                ...prev,
                targetH2: h2,
                targetGroup: groupIndex,
                isComparing: true
            }));

            // Small delay to show the target H2 and group
            await new Promise(resolve => setTimeout(resolve, 1000));

            const group = groups[groupIndex];
            const matchingIndices = [];

            // Compare h2 values in control word (all at once)
            const comparisons = group.controlWord.map((control, i) => ({
                index: i,
                h2: control.state === 'occupied' ? control.h2 : null,
                isMatch: control.state === 'occupied' && control.h2 === h2
            }));

            // Show all comparisons in the target group
            setSearchState(prev => ({
                ...prev,
                comparisons: comparisons,
                isComparing: true
            }));

            // Wait to show the comparison
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Find all matching indices
            const newMatchingIndices = comparisons
                .filter(c => c.isMatch)
                .map(c => c.index);

            // Update with matches
            setSearchState(prev => ({
                ...prev,
                matchedIndices: newMatchingIndices,
                isComparing: false
            }));

            // Wait before checking keys
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check actual keys for matches in the target group
            for (const slotIndex of newMatchingIndices) {
                if (group.slots[slotIndex].key === searchKey) {
                    setSearchState(prev => ({
                        ...prev,
                        isSearching: false,
                        found: true,
                        result: {
                            groupIndex,
                            slotIndex,
                            value: group.slots[slotIndex].value
                        }
                    }));
                    return;
                }
            }

            // Key not found in the target group
            setSearchState(prev => ({
                ...prev,
                isSearching: false,
                found: false,
                result: null,
                isComparing: false
            }));

        } catch (error) {
            console.error('Search error:', error);
            setSearchState(prev => ({
                ...prev,
                isSearching: false,
                found: false,
                result: null,
                isComparing: false
            }));
        }
    }, [searchKey, groups]);

    const getStateColor = (state: string, index: number, groupIndex: number) => {
        // Only highlight if this is the target group
        if (searchState.targetGroup !== -1 && searchState.targetGroup !== groupIndex) {
            return state === 'occupied' ? 'bg-green-100 border-green-300' : 'bg-gray-200 border-gray-300';
        }

        const isMatched = searchState.matchedIndices.includes(index);
        const isFound = searchState.found && searchState.result?.slotIndex === index;
        const isComparing = searchState.isComparing && searchState.comparisons?.[index] !== undefined;
        const comparison = isComparing ? searchState.comparisons[index] : null;

        if (isFound) return 'bg-green-300 border-green-500';
        if (isMatched) return 'bg-blue-200 border-blue-400';
        if (isComparing) return comparison?.isMatch ? 'bg-blue-100 border-blue-300' : 'bg-yellow-100 border-yellow-300';

        switch (state) {
            case 'empty': return 'bg-gray-200 border-gray-300';
            case 'occupied': return 'bg-green-100 border-green-300';
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
        <div className="p-6 max-w-6xl mx-auto bg-white text-gray-800">
            <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Swiss Table Visual Simulator</h3>
                <p className="text-gray-600 mb-4">
                    A visual representation of Swiss Tables hash implementation with 2 groups of 8 slots each.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-blue-800 mb-2">How it works:</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Hash is split: first 57 bits (H1) select the group (modulus), last 7 bits (H2) stored in control word</li>
                        <li>• Each group has 8 slots and a 64-bit control word (8 bytes)</li>
                        <li>• Control byte format: 1 bit for state (Empty/Occupied/Deleted) + 7 bits for H2</li>
                        <li>• Linear probing within the group for collision resolution</li>
                        <li>• Comparison takes places performing parallel operations on independent values within a larger value (SIMD hardware)</li>
                    </ul>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Insert value</h3>
                <div className="flex flex-wrap gap-4 mb-6">

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
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Added keys (summary)</h3>
                    <p>{groups.map(({ slots }) => { return slots.map(({ key }) => key + " ").filter(element => element != "") })}</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Search Section */}
                <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-yellow-800">Search Key</h3>
                    <div className="flex flex-wrap gap-4">
                        <input
                            type="text"
                            placeholder="Enter key to search"
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-white"
                        />
                        <button
                            onClick={searchKeyInTable}
                            disabled={searchState.isSearching}
                            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50"
                        >
                            {searchState.isSearching ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                    {searchState.result && (
                        <div className="mt-3 p-3 bg-green-50 text-green-800 rounded border border-green-200">
                            Found! Value: <strong>{searchState.result.value}</strong>
                        </div>
                    )}
                    {!searchState.isSearching && !searchState.found && searchState.matchedIndices.length > 0 && (
                        <div className="mt-3 p-3 bg-blue-50 text-blue-800 rounded border border-blue-200">
                            Found {searchState.matchedIndices.length} potential matches by hash...
                        </div>
                    )}
                    {!searchState.found && searchState.result === null && searchState.matchedIndices.length === 0 && !searchState.isSearching && (
                        <div className="mt-3 p-3 bg-red-50 text-red-800 rounded border border-red-200">
                            No matches found
                        </div>
                    )}
                    {!searchState.found && searchState.result === null && searchState.matchedIndices.length === 0 && searchState.isSearching && (
                        <div className="mt-3 p-3 bg-blue-50 text-blue-800 rounded border border-blue-200">
                            Searching key
                        </div>
                    )}
                </div>

                {groups.map((group, groupIndex) => {
                    const isTargetGroup = searchState.targetGroup === groupIndex || searchState.targetGroup === -1;
                    return (
                        <div
                            key={group.id}
                            className={`border-2 rounded-lg p-6 transition-all duration-300 ${isTargetGroup ? 'border-blue-400 bg-blue-50' : 'border-gray-300 opacity-70'
                                }`}
                        >
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                Group {group.id}
                                {isTargetGroup && searchState.isSearching && (
                                    <span className="ml-2 text-sm text-blue-600">(Searching here)</span>
                                )}
                            </h3>

                            {/* Control Word */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-3 text-gray-700">Control Word (64 bits)</h3>
                                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                                    {group.controlWord.map((control, idx) => {
                                        const isComparing = searchState.isComparing && searchState.comparisons?.[idx] !== undefined;
                                        const comparison = isComparing ? searchState.comparisons[idx] : null;
                                        const isMatch = comparison?.isMatch;
                                        const showComparison = isComparing && searchState.targetH2 !== null;

                                        return (
                                            <div key={idx} className="text-center">
                                                <div className="text-xs text-gray-500 mb-1">Byte {idx}</div>
                                                <div
                                                    className={`p-3 rounded border-2 transition-all duration-300 ${getStateColor(control.state, idx, groupIndex)}`}
                                                >
                                                    <div className="font-bold text-sm">{getStateText(control.state)}</div>
                                                    <div className="text-xs mt-1">
                                                        {control.state === 'occupied' ? `H2:${control.h2}` : '---'}
                                                    </div>
                                                    {showComparison && isTargetGroup && searchState.isSearching && (
                                                        <div className="mt-1 text-[10px] font-mono bg-gray-100 p-1 rounded">
                                                            {searchState.targetH2} == {comparison?.h2 ?? 'null'}
                                                            {isMatch !== undefined && (
                                                                <div className={`font-bold ${isMatch ? 'text-green-600' : 'text-red-600'}`}>
                                                                    {isMatch ? '✓ Match' : '✗ No match'}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
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
                                                        onClick={() => deleteKey(groupIndex, idx)}
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
                    );
                })}
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