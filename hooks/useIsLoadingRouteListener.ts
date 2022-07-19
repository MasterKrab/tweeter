import { useEffect } from "react"
import useIsLoadingRoute from "hooks/useIsLoadingRoute"

const useIsLoadingRouteListener = (handle: () => void) => {
    const isLoading = useIsLoadingRoute()

    useEffect(() => {
        isLoading && handle()
    }, [isLoading])
}

export default useIsLoadingRouteListener