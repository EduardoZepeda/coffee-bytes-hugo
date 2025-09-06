import { render } from 'preact';

import css from './style.css?inline';

import { useState, useEffect } from 'preact/compat';

function BloomFilterSimulator() {
	const [words, setWords] = useState<string[]>([]);
	const [currentWord, setCurrentWord] = useState('');
	const [word2, setWord2] = useState('');
	const [bits1, setBits1] = useState(Array(6).fill(0));
	const [bits2, setBits2] = useState(Array(6).fill(0));
	const [message, setMessage] = useState('');

	// Simple hash function that maps string to 6-bit array
	const hashFunction = (input: string) => {
		if (!input) return Array(6).fill(0);

		let hash = 0;
		for (let i = 0; i < input.length; i++) {
			hash = ((hash << 5) - hash + input.charCodeAt(i)) & 0xffffffff;
		}

		const bits = Array(6).fill(0);
		// Use multiple hash positions based on the hash value
		const pos1 = Math.abs(hash) % 6;
		const pos2 = Math.abs(hash >> 8) % 6;
		const pos3 = Math.abs(hash >> 16) % 6;

		bits[pos1] = 1;
		bits[pos2] = 1;
		bits[pos3] = 1;

		return bits;
	};
	
	// Calculate the OR of all word hashes
	const combinedBits = (words: string[]) => words.reduce((acc, word) => {
		const wordBits = hashFunction(word);
		return acc.map((bit, i) => bit | wordBits[i]);
	}, Array(6).fill(0));

	// Update bits1 when words change
	useEffect(() => {
		if (words.length === 0) {
			setBits1(Array(6).fill(0));
			return;
		}

		setBits1(combinedBits(words));
	}, [words]);

	useEffect(() => {
		setBits2(hashFunction(word2));
	}, [word2]);

	useEffect(() => {
		if (words.length === 0 || !word2) {
			setMessage('');
			return;
		}

		// Check if bits1 pattern exists in bits2 (subset check)

		if (compareBits(bits1, bits2)) {
			setMessage(`✅ Word might be in the set ${words.includes(word2) ? '' : '(possible collision)'}`);
		} else {
			setMessage('❌ Definitely not a match (no false negatives)');
		}
	}, [bits1, bits2, words, word2, currentWord]);

	const handleAddWord = () => {
		if (currentWord.trim() && !words.includes(currentWord.trim())) {
			setWords([...words, currentWord.trim()]);
			setCurrentWord('');
		}
	};

	const handleSetCurrentWord = (word: string) => {
		setCurrentWord(word);
		setBits1(combinedBits([...words, word]));
	};

	const compareBits = (bits1: number[], bits2: number[]) => {
		for (let i = 0; i < bits1.length; i++) {
			if (bits2[i] === 1 && bits1[i] === 0) {
				return false;
			}
		}
		return true;
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleAddWord();
		}
	};

	const handleReset = () => {
		setWords([]);
		setCurrentWord('');
	};

	const BitCell = ({ value }: { value: number, index: number }) => (
		<div className="w-12 h-12 border-2 border-gray-400 flex items-center justify-center bg-white text-lg font-bold">
			<span className={value === 1 ? 'text-blue-600' : 'text-gray-400'}>
				{value}
			</span>
		</div>
	);

	return (
		<div className="min-h-screen bg-indigo-100 p-8">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold text-gray-800 mb-4">Bloom Filter Simulator</h2>
					<p className="text-gray-600">
						A probabilistic data structure that never returns false negatives, but may return false positives
					</p>
				</div>

				<div className="bg-white rounded-lg shadow-lg p-8">
					{/* Input Section */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
						<div className="space-y-4">
							<label className="block text-sm font-medium text-gray-700">
								Add Word to Bloom Filter:
							</label>
							<input
								type="text"
								value={currentWord}
								onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleSetCurrentWord(e.target.value)}
								onKeyDown={handleKeyDown}
								className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Enter words (separated by Enter)"
							/>
							<button
								type="button"
								onClick={handleAddWord}
								className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-500 text-white"
							>
								Add Word
							</button>
							<button
								type="button"
								onClick={handleReset}
								className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-red-500 text-white"
							>
								Reset
							</button>
						</div>

						<div className="space-y-4">
							<label className="block text-sm font-medium text-gray-700">
								Word to check:
							</label>
							<input
								type="text"
								value={word2}
								onChange={(e:React.ChangeEvent<HTMLInputElement>) => setWord2(e.target.value)}
								className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Enter second word"
							/>
						</div>
					</div>

					{/* Hash Function Indicator */}
					<div className="text-center mb-8">
						<div className="inline-flex items-center space-x-4">
							<div className="h-0.5 w-16 bg-gray-400"></div>
							<span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
								Hash Function(s)
							</span>
							<div className="h-0.5 w-16 bg-gray-400"></div>
						</div>
					</div>

					{/* Binary Memory Cells */}
					<div className="space-y-8">
						{/* First tape */}
						<div className="space-y-2">
							<div className="text-sm font-medium text-gray-700">
								Bloom filter → Binary representation:
								<p>{`Words in filter: ${words.join(', ')}`}</p>
								<p className="text-red-500">{words.length>=3? 'The chances of getting a collision increase with more words in the filter':''}</p>
							</div>
							<div className="flex space-x-1 justify-center">
								{bits1.map((bit, index) => (
									<BitCell key={`word1-${index}`} value={bit} index={index} />
								))}
							</div>
						</div>

						{/* Second tape */}
						<div className="space-y-2">
							<div className="text-sm font-medium text-gray-700">
								Word → Binary representation:
							</div>
							<div className="flex space-x-1 justify-center">
								{bits2.map((bit, index) => (
									<BitCell key={`word2-${index}`} value={bit} index={index} />
								))}
							</div>
						</div>
					</div>

					{/* Result Message */}
					{message && (
						<div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
							<p className="text-lg font-medium text-gray-700">{message}</p>
						</div>
					)}

					{/* Explanation */}
					<div className="mt-8 p-4 bg-blue-50 rounded-lg">
						<h3 className="font-semibold text-blue-800 mb-2">How it works:</h3>
						<ul className="text-sm text-blue-700 space-y-1">
							<li>• Each word is hashed to set specific bits to 1</li>
							<li>• To check if a word exists, we verify if all its required bits are set</li>
							<li>• If any required bit is 0, the word definitely doesn't exist (no false negatives)</li>
							<li>• If all required bits are 1, the word might exist (possible false positives)</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

function renderBloomFilter() {
	if (document.getElementById("app-bloom-filter")) {
		document.body.addEventListener('htmx:afterSettle', renderBloomFilter);
		document.body.addEventListener('htmx:historyRestore', renderBloomFilter);
		render(<><style dangerouslySetInnerHTML={{ __html: css }} /><BloomFilterSimulator /></>, document.getElementById('app-bloom-filter').attachShadow({ mode: 'open' }));
	}
	return;
}

export default renderBloomFilter;
