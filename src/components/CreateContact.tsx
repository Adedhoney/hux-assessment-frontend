import React, { useState } from "react"
import { addContact } from "../shared/apicall"

const ContactForm: React.FC<{ handleToggle: any }> = (
    props: any
) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await addContact({
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
                <h3>Add New Contact</h3>
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
                            type="number"
                            placeholder="Phone number"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                            required
                        />
                        <input
                            type="number"
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
                            Add New Contact
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

export default ContactForm
