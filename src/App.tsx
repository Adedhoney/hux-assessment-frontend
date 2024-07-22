import React from "react"
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom"

import { AppProvider } from "./AppContext"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import "./App.css"
import ContactPage from "./pages/Contact"
import HomePage from "./pages/HomePage"

const App: React.FC = () => {
    return (
        <Router>
            <AppProvider>
                <div className="App">
                    <Routes>
                        <Route
                            path="/login"
                            element={<Login />}
                        />
                        <Route
                            path="/register"
                            element={<Register />}
                        />
                        <Route
                            path="/"
                            element={<HomePage />}
                        />
                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />
                        <Route
                            path="/contact/:contactId"
                            element={<ContactPage />}
                        />
                    </Routes>
                </div>
            </AppProvider>
        </Router>
    )
}

export default App
