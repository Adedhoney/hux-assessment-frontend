import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { doLogin } from "../shared/apicall"
import { hasAccessRedirect } from "../components/redirects"
import Swal from "sweetalert2"

const Login: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        hasAccessRedirect()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await doLogin({ email, password })
            navigate("/dashboard")
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
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input
                        type="text"
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
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="alternate-action">
                <p>
                    Don't have an account yet?{" "}
                    <a href="/register">Register</a>
                </p>
            </div>
        </div>
    )
}

export default Login
