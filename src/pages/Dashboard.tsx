import React, {
    useContext,
    useEffect,
    useState,
} from "react"
import ContactForm from "../components/CreateContact"
import ContactList from "../components/ContactList"

// import { useNavigate } from "react-router-dom"
import { getUser, logout } from "../shared/apicall"
import { AppContext, IAppContext } from "../AppContext"

const Dashboard: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const { user, setUser } = useContext(
        AppContext
    ) as IAppContext

    const token = localStorage.getItem("token")
    if (!token) {
        window.location.href = "/home"
        return
    }

    useEffect(() => {
        if (!user) {
            ;(async () => {
                const user = await getUser()
                setUser!(user!)
            })()
        }
    })

    // const navigate = useNavigate()

    const handleToggle = () => {
        setIsFormOpen(!isFormOpen)
    }

    return (
        <>
            {isFormOpen && (
                <ContactForm handleToggle={handleToggle} />
            )}
            <div className="welcome-head">
                <button
                    type="submit"
                    className="logout"
                    onClick={() => {
                        logout()
                    }}
                >
                    Log out
                </button>
                <h2>
                    {user?.firstName}, welcome to your
                    contacts!
                </h2>
            </div>

            <div className="dashboard-container">
                <div className="dashboard-head">
                    <h3>Contact List</h3>
                    <button
                        type="submit"
                        className="add-contact-button form-button"
                        onClick={handleToggle}
                    >
                        Add Contact
                    </button>
                </div>

                <div className="contact-container">
                    <ContactList />
                </div>
            </div>
        </>
    )
}

export default Dashboard
