import React, {
    useContext,
    useEffect,
    useState,
} from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    Contact,
    deleteContact,
    getSingleContact,
    getUser,
} from "../shared/apicall"
import { AppContext, IAppContext } from "../AppContext"
import EditContactForm from "../components/EditContact"

const ContactPage: React.FC = () => {
    const { contactId } = useParams()
    const [contact, setContact] = useState<Contact | any>(
        {}
    )

    const navigate = useNavigate()

    const { user, setUser } = useContext(
        AppContext
    ) as IAppContext

    useEffect(() => {
        if (!user) {
            const token = localStorage.getItem("token")
            ;(async () => {
                if (!token) {
                    window.location.href = "/"
                }
                const user = await getUser()
                setUser!(user!)
            })()
        }
    })

    useEffect(() => {
        ;(async () => {
            const contactInfo = await getSingleContact(
                contactId!
            )
            setContact(contactInfo!)
        })()
    })

    const [editingContact, setEditingContact] =
        useState<Contact | null>(null)

    const openEdit = (contact: Contact) => {
        setEditingContact(contact)
    }
    const closeEdit = () => {
        setEditingContact(null)
    }
    const handleDelete = async (contactId: string) => {
        try {
            await deleteContact(contactId)
        } catch (error) {}
    }

    return (
        <div className="auth-container">
            <>
                {editingContact && (
                    <EditContactForm
                        handleToggle={closeEdit}
                        contact={editingContact}
                    />
                )}
            </>
            <>
                <p className="grid-item">
                    {contact.firstName}
                </p>
                <p className="grid-item">
                    {contact.lastName}
                </p>
                <p className="grid-item">{contact.phone}</p>
                <p className="grid-item">{contact.email}</p>
                <button
                    className="contact-button"
                    onClick={() => openEdit(contact)}
                >
                    Edit
                </button>
                <button
                    className="contact-button"
                    onClick={() =>
                        handleDelete(contact.contactId!)
                    }
                >
                    Delete
                </button>
            </>
        </div>
    )
}

export default ContactPage
