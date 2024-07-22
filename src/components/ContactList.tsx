import React, {
    useContext,
    useEffect,
    useState,
} from "react"
import {
    Contact,
    getAllUserContacts,
} from "../shared/apicall"
import { useNavigate } from "react-router-dom"
import { AppContext, IAppContext } from "../AppContext"

const ContactList: React.FC = () => {
    const { contacts, setContacts } = useContext(
        AppContext
    ) as IAppContext
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    loading

    useEffect(() => {
        fetchContacts()
    }, [])

    const navigate = useNavigate()

    const handleClick = (contactId: string) => {
        navigate(`/contact/${contactId}`)
    }

    const fetchContacts = async () => {
        setLoading(true)
        const users = await getAllUserContacts()
        setContacts!([...users!])
        setLoading(false)
    }

    const listItem = (contact: Contact) => {
        return (
            <li
                key={contact.contactId}
                onClick={() =>
                    handleClick(contact.contactId)
                }
                className="contact-list form-group"
            >
                <p>
                    {contact.firstName} {contact.lastName}
                </p>
            </li>
        )
    }

    const filter = () => {
        return contacts!.filter((contact) => {
            const fullName =
                `${contact.firstName} ${contact.lastName}`.toLowerCase()
            return fullName.includes(search.toLowerCase())
        })
    }

    return (
        <div>
            <input
                type="text"
                className="search"
                placeholder="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {!contacts![0] && (
                <div>
                    <p>
                        Add your first contact to get
                        started!
                    </p>
                </div>
            )}

            <ul>
                {search
                    ? filter().map((contact) => {
                          return listItem(contact)
                      })
                    : contacts!.map((contact) => {
                          return listItem(contact)
                      })}
            </ul>
        </div>
    )
}

export default ContactList
