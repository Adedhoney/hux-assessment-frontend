import React from "react"
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom"

import { AppProvider } from "./AppContext"
import Login from "./pages/Login"
import Register from "./pages/Register"

import "./App.css"

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
                    </Routes>
                </div>
            </AppProvider>
        </Router>
    )
}

export default App
