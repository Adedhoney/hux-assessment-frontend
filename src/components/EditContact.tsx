import React, { useState } from "react"
import {
    Contact,
    getSingleContact,
    updateContact,
} from "../shared/apicall"
import Swal from "sweetalert2"

const EditContactForm: React.FC<{
    handleToggle: any
    setContact: any
    contact: Contact
}> = (props: any) => {
    const [firstName, setFirstName] = useState(
        props.contact.firstName
    )
    const [lastName, setLastName] = useState(
        props.contact.lastName
    )
    const [phone, setPhone] = useState(props.contact.phone)
    const [email, setEmail] = useState(
        props.contact.email || ""
    )

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            await updateContact(props.contact.contactId, {
                firstName,
                lastName,
                phone,
                email,
            })
            props.handleToggle()
            setFirstName("")
            setLastName("")
            setPhone("")
            setEmail("")
            const newContact = await getSingleContact(
                props.contact.contactId
            )
            props.setContact(newContact)
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
        <div>
            <div
                className="contact-form-overlay"
                onClick={props.handleToggle}
            ></div>
            <div className="contact-form">
                <h3>Edit Contact</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) =>
                                setFirstName(e.target.value)
                            }
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) =>
                                setLastName(e.target.value)
                            }
                            required
                        />

                        <input
                            type="tel"
                            placeholder="Phone number"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                            required
                        />
                        <input
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />
                    </div>
                    <div className="button-div">
                        <button
                            type="submit"
                            className="form-button"
                        >
                            Edit Contact
                        </button>
                        <button
                            onClick={props.handleToggle}
                            className="form-button"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditContactForm
