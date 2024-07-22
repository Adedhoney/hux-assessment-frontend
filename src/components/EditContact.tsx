import React, { useState } from "react"
import { Contact, updateContact } from "../shared/apicall"

const EditContactForm: React.FC<{
    handleToggle: any
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
        e.preventDefault()
        await updateContact(props.contact, {
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
