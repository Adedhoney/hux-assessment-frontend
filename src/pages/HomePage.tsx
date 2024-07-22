import React, { useContext, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import { AppContext, IAppContext } from "../AppContext"
import { getUser } from "../shared/apicall"

const HomePage: React.FC = () => {
    // const navigate = useNavigate()

    const { user, setUser } = useContext(
        AppContext
    ) as IAppContext

    useEffect(() => {
        if (!user) {
            const token = localStorage.getItem("token")
            ;(async () => {
                if (!token) {
                    return
                }
                const user = await getUser()
                setUser!(user!)
            })()
        }
    })

    return (
        <div className="dashboard-container">
            <div className="alternate-action">
                <h1>Welcome to Contact App</h1>
                <p>Your lorem ipsum doloe</p>
                <div className="homepage-info">
                    <p>You can create a new contact</p>
                    <p>Search Contacts</p>
                    <p>Edit a contact</p>
                    <p>Delete a contact</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage
