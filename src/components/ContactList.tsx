import React, { useContext, useEffect } from "react"
import { getAllUserContacts } from "../shared/apicall"
import { useNavigate } from "react-router-dom"
import { AppContext, IAppContext } from "../AppContext"

const ContactList: React.FC = () => {
    const { contacts, setContacts } = useContext(
        AppContext
    ) as IAppContext

    useEffect(() => {
        ;(async () => {
            if (!contacts![0]) {
                const users = await getAllUserContacts()
                setContacts!([...users!])
            }
        })()
    }, [])

    const navigate = useNavigate()

    const handleClick = (contactId: string) => {
        navigate(`/contact/${contactId}`)
    }

    return (
        <div>
            <ul>
                {contacts!.map((contact) => (
                    <li
                        key={contact.contactId}
                        onClick={() =>
                            handleClick(contact.contactId)
                        }
                        className="contact-list form-group"
                    >
                        <p>
                            {contact.firstName}{" "}
                            {contact.lastName}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ContactList
