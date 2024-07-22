import { createContext, useState, ReactNode } from "react"
import { Contact, User } from "./shared/apicall"

export interface IAppContext {
    user?: User | null
    setUser?: React.Dispatch<
        React.SetStateAction<User | null>
    >
    contacts?: Contact[]
    setContacts?: React.Dispatch<
        React.SetStateAction<Contact[]>
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
    const [contacts, setContacts] = useState<Contact[]>([])
    return (
        <AppContext.Provider
            value={{ user, setUser, contacts, setContacts }}
        >
            {children}
        </AppContext.Provider>
    )
}
