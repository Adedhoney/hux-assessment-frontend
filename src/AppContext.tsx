import { createContext, useState, ReactNode } from "react"
import { User } from "./shared/apicall"

export interface IAppContext {
    user?: User | null
    setUser?: React.Dispatch<
        React.SetStateAction<User | null>
    >
}
// Create the context
export const AppContext = createContext<IAppContext>({})

interface AppProviderProps {
    children: ReactNode
}

// Create the provider component
export const AppProvider = ({
    children,
}: AppProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    )
}
