import renderBloomFilter from './bloomFilter'
import renderBounceVsThrottle from './debounceThrottle'
import renderSwissTable from './swissTables'
import renderWorkerPool from './workerPool'

function main() {
    renderBloomFilter()
    renderSwissTable()
    renderWorkerPool()
    renderBounceVsThrottle()
}

main()