import React, { useState, useEffect, useCallback, useRef } from 'preact/compat';
import { Search, Plus, Trash2, RotateCcw } from 'lucide-react';
import css from './style.css?inline';
import { render } from 'preact';



interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  id: string;
}

class Trie {
  root: TrieNode;
  private nodeCounter: number = 0;

  constructor() {
    this.root = {
      children: new Map(),
      isEndOfWord: false,
      id: 'root'
    };
  }

  insert(word: string): void {
    let current = this.root;
    
    for (const char of word.toUpperCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, {
          children: new Map(),
          isEndOfWord: false,
          id: `node-${++this.nodeCounter}`
        });
      }
      current = current.children.get(char)!;
    }
    
    current.isEndOfWord = true;
  }

  search(word: string): boolean {
    let current = this.root;
    
    for (const char of word.toUpperCase()) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }
    
    return current.isEndOfWord;
  }

  delete(word: string): boolean {
    const deleteHelper = (node: TrieNode, word: string, depth: number): boolean => {
      if (depth === word.length) {
        if (!node.isEndOfWord) return false;
        node.isEndOfWord = false;
        return node.children.size === 0;
      }

      const char = word[depth];
      const childNode = node.children.get(char);
      
      if (!childNode) return false;

      const shouldDelete = deleteHelper(childNode, word, depth + 1);

      if (shouldDelete) {
        node.children.delete(char);
        return !node.isEndOfWord && node.children.size === 0;
      }

      return false;
    };

    return deleteHelper(this.root, word.toUpperCase(), 0);
  }

  getAllWords(): string[] {
    const words: string[] = [];
    
    const dfs = (node: TrieNode, currentWord: string) => {
      if (node.isEndOfWord) {
        words.push(currentWord);
      }
      
      for (const [char, childNode] of node.children.entries()) {
        dfs(childNode, currentWord + char);
      }
    };
    
    dfs(this.root, '');
    return words;
  }
}

const TrieVisualization: React.FC<{ trie: Trie; highlightPath: string; searchResult: boolean | null }> = ({ 
  trie, 
  highlightPath,
  searchResult 
}) => {
  const renderNode = (node: TrieNode, char: string = '', level: number = 0, path: string = ''): JSX.Element => {
    const currentPath = path + char;
    const isHighlighted = highlightPath && currentPath.length <= highlightPath.length && 
                         highlightPath.startsWith(currentPath);
    const isSearchPath = highlightPath && currentPath === highlightPath;
    
    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* Node */}
        <div className={`
          relative w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold
          ${node.isEndOfWord 
            ? 'bg-red-100 border-red-500 text-red-700' 
            : 'bg-blue-100 border-blue-500 text-blue-700'
          }
          ${isHighlighted ? 'ring-4 ring-yellow-300' : ''}
          ${isSearchPath && searchResult === false ? 'bg-red-200 border-red-600' : ''}
          ${isSearchPath && searchResult === true ? 'bg-green-200 border-green-600' : ''}
        `}>
          {char || '*'}
          {node.isEndOfWord && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          )}
        </div>
        
        {/* Children */}
        {node.children.size > 0 && (
          <div className="flex space-x-4 mt-4">
            {Array.from(node.children.entries()).map(([childChar, childNode]) => (
              <div key={childChar} className="flex flex-col items-center">
                {/* Connection line */}
                <div className={`w-px h-4 ${isHighlighted ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                {renderNode(childNode, childChar, level + 1, currentPath)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-auto p-8 bg-gray-50 rounded-lg border-2 border-gray-200">
      <div className="flex justify-center min-w-max">
        {renderNode(trie.root)}
      </div>
    </div>
  );
};

function TrieSimulator() {
  const [trie] = useState(() => new Trie());
  const [inputWord, setInputWord] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [highlightPath, setHighlightPath] = useState('');
  const [searchResult, setSearchResult] = useState<boolean | null>(null);
  
  const updateWords = useCallback(() => {
    setWords(trie.getAllWords());
  }, [trie]);

  const handleInsert = () => {
    if (!inputWord.trim()) {
      setMessage('Please enter a word to insert');
      return;
    }
    
    const word = inputWord.trim().toUpperCase();
    if (trie.search(word)) {
      setMessage(`"${word}" already exists in the trie`);
    } else {
      trie.insert(word);
      setMessage(`"${word}" inserted successfully`);
      setHighlightPath(word);
      updateWords();
    }
    setInputWord('');
    setSearchResult(null);
  };

  const handleSearch = () => {
    if (!searchWord.trim()) {
      setMessage('Please enter a word to search');
      return;
    }
    
    const word = searchWord.trim().toUpperCase();
    const found = trie.search(word);
    setSearchResult(found);
    setHighlightPath(word);
    setMessage(found ? `"${word}" found in the trie` : `"${word}" not found in the trie`);
  };

  const handleDelete = () => {
    if (!searchWord.trim()) {
      setMessage('Please enter a word to delete');
      return;
    }
    
    const word = searchWord.trim().toUpperCase();
    if (!trie.search(word)) {
      setMessage(`"${word}" does not exist in the trie`);
      setSearchResult(false);
      setHighlightPath(word);
      return;
    }
    
    trie.delete(word);
    setMessage(`"${word}" deleted successfully`);
    setHighlightPath('');
    setSearchResult(null);
    updateWords();
  };

  const handleReset = () => {
    // Clear the trie by creating a new one
    Object.assign(trie, new Trie());
    setWords([]);
    setMessage('Trie reset successfully');
    setHighlightPath('');
    setSearchResult(null);
    setInputWord('');
    setSearchWord('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  // Initialize with sample words
  React.useEffect(() => {
    const sampleWords = ['CAT', 'CATS', 'CAR', 'CARD', 'CARE', 'CAREFUL'];
    sampleWords.forEach(word => trie.insert(word));
    updateWords();
    setMessage('Sample words loaded: CAT, CATS, CAR, CARD, CARE, CAREFUL');
  }, [trie, updateWords]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 bg-white text-gray-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Trie (Prefix Tree) Simulator</h1>
        <p className="text-gray-600">
          Visualize how a trie data structure works. Insert, search, and delete words to see the tree structure change.
        </p>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Insert Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Plus className="mr-2" size={20} />
            Insert Word
          </h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleInsert)}
              placeholder="Enter word to insert"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleInsert}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Insert
            </button>
          </div>
        </div>

        {/* Search & Delete Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Search className="mr-2" size={20} />
            Search & Delete
          </h2>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleSearch)}
              placeholder="Enter word to search/delete"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Search
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
            >
              <Trash2 className="mr-2" size={16} />
              Delete
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center justify-center"
            >
              <RotateCcw className="mr-2" size={16} />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-md ${
          message.includes('successfully') || message.includes('found') 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : message.includes('not found') || message.includes('does not exist')
            ? 'bg-red-100 text-red-800 border border-red-200'
            : 'bg-blue-100 text-blue-800 border border-blue-200'
        }`}>
          {message}
        </div>
      )}

      {/* Legend */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-semibold mb-3">Legend:</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-blue-500 mr-2 flex items-center justify-center text-xs">*</div>
            <span>Root node</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-blue-500 mr-2 flex items-center justify-center text-xs">A</div>
            <span>Character node</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-red-100 border-2 border-red-500 mr-2 flex items-center justify-center text-xs relative">
              A
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <span>End of word</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-blue-500 ring-2 ring-yellow-300 mr-2 flex items-center justify-center text-xs">A</div>
            <span>Highlighted path</span>
          </div>
        </div>
      </div>

      {/* Trie Visualization */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Trie Structure</h2>
        <TrieVisualization trie={trie} highlightPath={highlightPath} searchResult={searchResult} />
      </div>

      {/* Current Words */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Words in Trie ({words.length})</h2>
        <div className="flex flex-wrap gap-2">
          {words.length > 0 ? (
            words.map((word) => (
              <span
                key={word}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {word}
              </span>
            ))
          ) : (
            <span className="text-gray-500 italic">No words in trie</span>
          )}
        </div>
      </div>
    </div>
  );
}


function renderTrie() {
    if (document.getElementById("app-trie-simulator")) {
        document.body.addEventListener('htmx:afterSettle', renderTrie);
        document.body.addEventListener('htmx:historyRestore', renderTrie);
        render(<><style dangerouslySetInnerHTML={{ __html: css }} /><TrieSimulator /></>, document.getElementById('app-trie-simulator').attachShadow({ mode: 'open' }));
    }
    return;
}

export default renderTrie;

