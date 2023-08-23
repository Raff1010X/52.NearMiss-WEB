// register navigator sync event listener react hook
import { useEffect } from 'react'

const useBackgroundSync = () => {
    useEffect(() => {
        if (window.indexedDB && 'serviceWorker' in navigator && 'SyncManager' in window) {
            navigator.serviceWorker.ready.then((sw) => {
                if (sw.sync) {
                    sw.sync.register('nearmiss-sync')
                    .then(() => {
                        console.log('Sync registered')
                    })
                    .catch((err) => {
                        console.error('Error registering sync', err)
                    })
                }
            })
        }
    }, [])
}

export default useBackgroundSync