import React, {
    useContext,
    useEffect,
    useState,
} from "react"
import ContactForm from "../components/CreateContact"
import ContactList from "../components/ContactList"

import { useNavigate } from "react-router-dom"
import { getUser, logout } from "../shared/apicall"
import { AppContext, IAppContext } from "../AppContext"

const Dashboard: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const { user, setUser } = useContext(
        AppContext
    ) as IAppContext

    useEffect(() => {
        if (!user) {
            const token = localStorage.getItem("token")
            ;(async () => {
                if (!token) {
                    window.location.href = "/"
                }
                const user = await getUser()
                setUser!(user!)
            })()
        }
    })

    const navigate = useNavigate()

    const handleToggle = () => {
        setIsFormOpen(!isFormOpen)
    }

    return (
        <>
            <h2>Dashboard</h2>
            <div className="dashboard-container">
                <button
                    type="submit"
                    className="add-contact-button form-button"
                    onClick={handleToggle}
                >
                    Add Contact
                </button>
                {isFormOpen && (
                    <ContactForm
                        handleToggle={handleToggle}
                    />
                )}
                <div className="contact-container">
                    <ContactList />
                </div>
                <button
                    type="submit"
                    className="logout"
                    onClick={() => {
                        logout()
                    }}
                >
                    Log out
                </button>
            </div>
        </>
    )
}

export default Dashboard
