import React, { useEffect, useState } from "react"
import { signUp } from "../shared/apicall"
import { useNavigate } from "react-router-dom"
import { hasAccessRedirect } from "../components/redirects"

const Register: React.FC = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] =
        useState("")

    const navigate = useNavigate()
    useEffect(() => {
        hasAccessRedirect()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            // errorMessage(
            //     "Make sure password and confirm password are the same"
            // )
            return
        }
        try {
            await signUp({
                firstName,
                lastName,
                email,
                password,
            })

            navigate("/login")
            // should add awaiting animation later and one that will display error
        } catch (error) {
            console.error("Registration error:", error)
        }
    }

    return (
        <div className="auth-container">
            <form
                onSubmit={handleSubmit}
                className="auth-form"
            >
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="firstName">
                        First name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Username"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                        required
                    />

                    <label htmlFor="lastName">
                        Last name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Username"
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value)
                        }
                        required
                    />

                    <label htmlFor="">Email</label>
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <label htmlFor="">
                        Confirm password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                        required
                    />
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register
