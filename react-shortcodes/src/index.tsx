import renderBloomFilter from './bloomFilter'
import renderBounceVsThrottle from './debounceThrottle'
import renderSwissTable from './swissTables'
import renderWorkerPool from './workerPool'
import renderTrie from './trie'

function main() {
    renderBloomFilter()
    renderSwissTable()
    renderWorkerPool()
    renderTrie()
    renderBounceVsThrottle()
}

main()