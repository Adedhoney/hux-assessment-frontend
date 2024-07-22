import React, { useEffect, useState } from "react"
import { signUp } from "../shared/apicall"
import { useNavigate } from "react-router-dom"
import { hasAccessRedirect } from "../components/redirects"
import Swal from "sweetalert2"

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
            await Swal.fire({
                text: (error as Error).message,
                confirmButtonText: "Continue",
                icon: "error",
                color: "#fff",
                background: "#59afade9",
                confirmButtonColor: "#2c3e50",
                focusConfirm: false,
            })
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
                        placeholder="First name"
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
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value)
                        }
                        required
                    />

                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
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

                    <label
                        className={`${
                            password &&
                            password !== confirmPassword
                                ? "red"
                                : ""
                        }`}
                    >
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
            <div className="alternate-action">
                <p>
                    Already have an account?{" "}
                    <a href="/login">Login</a>
                </p>
            </div>
        </div>
    )
}

export default Register
