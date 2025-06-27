import { useEffect } from "react"

export const FavoritesSync = () => {
    useEffect(() => {
        const syncFavorites = async () => {
            const token = localStorage.getItem("accessToken")
            const localData = localStorage.getItem("petcare_wishlist")

            if (!token || !localData) return
            const localFavorites: { id: number }[] = JSON.parse(localData)

            // Получаем текущие товары из базы
            const res = await fetch("/api/FavoritesProducts/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const serverFavorites = await res.json()
            const serverIds = serverFavorites.map((item: any) => item.productId)

            const localIds = localFavorites.map((item) => item.id)

            // Добавить только те, которых нет в базе
            const toAdd = localIds.filter((id) => !serverIds.includes(id))
            const toDelete = serverIds.filter((id: number) => !localIds.includes(id))

            await Promise.all([
                ...toAdd.map((id) =>
                    fetch("/api/FavoritesProducts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ productId: id }),
                    })
                ),
                ...toDelete.map((id) =>
                    fetch(`/api/FavoritesProducts/${id}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                ),
            ])
        }

        const interval = setInterval(syncFavorites, 120_000)
        syncFavorites()

        return () => clearInterval(interval)
    }, [])

    return null
}
