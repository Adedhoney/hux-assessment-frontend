import React, { useContext, useState } from "react"
import {
    addContact,
    getAllUserContacts,
} from "../shared/apicall"
import { AppContext, IAppContext } from "../AppContext"
import Swal from "sweetalert2"

const ContactForm: React.FC<{ handleToggle: any }> = (
    props: any
) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    const { setContacts } = useContext(
        AppContext
    ) as IAppContext

    const handleSubmit = async (e: React.FormEvent) => {
        try {
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
            const users = await getAllUserContacts()
            setContacts!([...users!])
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
                            type="tel"
                            placeholder="Phone number"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                            required
                        />
                        <input
                            type="email"
                            name="email"
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
