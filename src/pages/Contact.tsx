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
import Swal from "sweetalert2"

const ContactPage: React.FC = () => {
    const { contactId } = useParams()
    const [contact, setContact] = useState<Contact | any>(
        {}
    )

    // const navigate = useNavigate()

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
    }, [])

    useEffect(() => {
        ;(async () => {
            const contactInfo = await getSingleContact(
                contactId!
            )
            setContact(contactInfo!)
        })()
    }, [])

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
            let cont = await Swal.fire({
                text: "Are you sure you want to delete this contact?",
                confirmButtonText: "Continue",
                showCancelButton: true,
                icon: "warning",
                color: "#fff",
                background: "#59afade9",
                confirmButtonColor: "#2c3e50",
                focusConfirm: false,
            })
            if (cont.isConfirmed) {
                await deleteContact(contactId)
                navigate(`/dashboard`)
            }
        } catch (error) {
            console.log()
        }
    }

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/dashboard`)
    }

    return (
        <>
            {" "}
            <>
                {editingContact && (
                    <EditContactForm
                        setContact={setContact}
                        handleToggle={closeEdit}
                        contact={editingContact}
                    />
                )}
            </>
            <button
                className="contact-button back"
                onClick={handleClick}
            >
                Back
            </button>
            <div className="auth-container">
                <>
                    <h1>
                        {contact.firstName &&
                            contact.firstName[0]}
                        {contact.lastName &&
                            contact.lastName[0]}
                    </h1>
                    <div className="grid12">
                        <p>First name : </p>
                        <p className="grid-item">
                            {contact.firstName}
                        </p>
                    </div>

                    <div className="grid12">
                        <p>Last name : </p>
                        <p className="grid-item">
                            {contact.lastName}
                        </p>
                    </div>

                    <div className="grid12">
                        <p>Phone : </p>
                        <p className="grid-item">
                            {contact.phone}
                        </p>
                    </div>

                    {contact.email && (
                        <div className="grid12">
                            <p>Email : </p>
                            <p className="grid-item">
                                {contact.email}
                            </p>
                        </div>
                    )}
                    <div className="button-div">
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
                    </div>
                </>
            </div>
        </>
    )
}

export default ContactPage
