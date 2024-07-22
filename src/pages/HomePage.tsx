import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext, IAppContext } from "../AppContext"
import { getUser, logout } from "../shared/apicall"

const HomePage: React.FC = () => {
    const navigate = useNavigate()

    const { user, setUser } = useContext(
        AppContext
    ) as IAppContext

    useEffect(() => {
        if (!user) {
            const token = localStorage.getItem("token")
            if (!token) {
                return
            }
            ;(async () => {
                try {
                    const user = await getUser()
                    setUser!(user!)
                } catch (error) {}
            })()
        }
    })

    return (
        <>
            {user && (
                <button
                    type="submit"
                    className="logout"
                    onClick={() => {
                        logout()
                    }}
                >
                    Log out
                </button>
            )}
            <div className="dashboard-container">
                <h1>Welcome to Contact App</h1>

                <div className="homepage">
                    <div className="homepageInfo">
                        <p className="homepage-paragraph">
                            Your Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                            Ut enim ad minim veniam
                        </p>
                        <div className="homepage-details">
                            <p>
                                You can create a new contact
                            </p>
                            <p>Search Contacts</p>
                            <p>Edit a contact</p>
                            <p>Delete a contact</p>
                        </div>
                    </div>
                    {!user ? (
                        <div className="homepageButtons">
                            <button
                                className="form-button homepageButton"
                                onClick={() => {
                                    navigate("/register")
                                }}
                            >
                                Register
                            </button>
                            <button
                                className="form-button homepageButton"
                                onClick={() => {
                                    navigate("/login")
                                }}
                            >
                                Login
                            </button>
                            <button className="form-button homepageButton">
                                Lorem Ipsum
                            </button>
                            <button className="form-button homepageButton">
                                Lorem Ipsum
                            </button>
                        </div>
                    ) : (
                        <div className="homepageButtons">
                            <button
                                className="form-button homepageButton"
                                onClick={() => {
                                    navigate("/dashboard")
                                }}
                            >
                                My Contacts
                            </button>
                            <button className="form-button homepageButton">
                                Lorem Ipsum
                            </button>
                            <button className="form-button homepageButton">
                                Lorem Ipsum
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default HomePage
