import { getUser } from "../shared/apicall"

export const hasAccessRedirect = async () => {
    try {
        const token = localStorage.getItem("token")
        ;(async () => {
            if (token) {
                const user = await getUser()
                if (user) {
                    window.location.href = "/dashboard"
                }
            }
        })()
    } catch (error) {
        // console.log(error)
    }
}

export const noAccessRedirect = async () => {
    try {
        const token = localStorage.getItem("token")
        ;(async () => {
            if (!token) {
                window.location.href = "/login"
            }
            const user = await getUser()
            if (!user) {
                window.location.href = "/login"
            }
        })()
    } catch (error) {
        // console.log(error)
    }
}
