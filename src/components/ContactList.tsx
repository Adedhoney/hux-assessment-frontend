import React, { useEffect, useState } from "react"
import {
    Contact,
    deleteContact,
    getAllUserContacts,
} from "../shared/apicall"
import EditContactForm from "./EditContact"

const ContactList: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([])

    const [editingContact, setEditingContact] =
        useState<Contact | null>(null)

    useEffect(() => {
        ;(async () => {
            const users = await getAllUserContacts()
            setContacts(users!)
        })()
    }, [])

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
        <div>
            <h3>Contacts</h3>
            <>
                {editingContact && (
                    <EditContactForm
                        handleToggle={closeEdit}
                        contact={editingContact}
                    />
                )}
            </>
            <ul>
                {contacts.map((contact) => (
                    <li
                        key={contact.contactId}
                        className="contact-list form-group"
                    >
                        <>
                            <p className="grid-item">
                                {contact.firstName}
                            </p>
                            <p className="grid-item">
                                {contact.lastName}
                            </p>
                            <p className="grid-item">
                                {contact.phone}
                            </p>
                            <p className="grid-item">
                                {contact.email}
                            </p>
                            <button
                                className="contact-button"
                                onClick={() =>
                                    openEdit(contact)
                                }
                            >
                                Edit
                            </button>
                            <button
                                className="contact-button"
                                onClick={() =>
                                    handleDelete(
                                        contact.contactId!
                                    )
                                }
                            >
                                Delete
                            </button>
                        </>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ContactList
