import axios, { AxiosError } from "axios"
import config from "./config"
// import { errorMessage, successMessage } from "./alert"

// const enum responseStatus {
//     success = "success",
//     error = "error",
// }

interface SignUpData {
    email: string
    firstName: string
    lastName: string
    password: string
}

interface LoginData {
    email: string
    password: string
}

export interface User {
    _id: string
    userId: string
    email: string
    firstName: string
    lastName: string
    createdOn: number
    lastModifiedOn: number
}

export interface Contact {
    _id: string
    contactId: string
    userId: string
    firstName: string
    lastName: string
    phone: string
    email: string
    createdOn: number
    lastModifiedOn: number
}

interface SaveContactData {
    firstName: string
    lastName: string
    phone: string
    email?: string
}

interface UpdateContactData {
    firstName?: string
    lastName?: string
    phone?: string
    email?: string
}

export const signUp = async (signUpInfo: SignUpData) => {
    try {
        await axios.post(
            `${config.BASE_BACKEND_URL}/account/sign-up`,
            { data: signUpInfo }
        )
        return
    } catch (error) {
        throw new Error(
            (
                (error as AxiosError).response?.data as any
            ).message
        )
    }
}

export const doLogin = async (loginInfo: LoginData) => {
    try {
        const response = await axios.post(
            `${config.BASE_BACKEND_URL}/account/login`,
            { data: loginInfo }
        )

        localStorage.setItem(
            "token",
            response.data.data.token
        )
        return response.data.data.user as User
    } catch (error) {
        throw new Error(
            (
                (error as AxiosError).response?.data as any
            ).message
        )
    }
}

export const getUser = async () => {
    try {
        const response = await axios.get(
            `${config.BASE_BACKEND_URL}/account`,
            {
                headers: {
                    authorization: `Basic ${localStorage.getItem(
                        "token"
                    )}`,
                },
            }
        )
        return response.data.data.user as User
    } catch (error) {
        const errorMessage = (
            (error as AxiosError).response?.data as any
        ).message
        if (
            errorMessage === "Invalid Token" ||
            errorMessage === "Token Expire"
        ) {
            return logout()
        }
        throw new Error(errorMessage)
    }
}

export const addContact = async (
    contact: SaveContactData
) => {
    try {
        if (!contact.email) {
            delete contact.email
        }
        const response = await axios.post(
            `${config.BASE_BACKEND_URL}/contact`,
            { data: contact },
            {
                headers: {
                    authorization: `Basic ${localStorage.getItem(
                        "token"
                    )}`,
                },
            }
        )

        return response.data.data.contact as Contact
    } catch (error) {
        const errorMessage = (
            (error as AxiosError).response?.data as any
        ).message
        if (
            errorMessage === "Invalid Token" ||
            errorMessage === "Token Expire"
        ) {
            return logout()
        }
        throw new Error(errorMessage)
    }
}
export const updateContact = async (
    contactId: string,
    contact: UpdateContactData
) => {
    try {
        if (!contact.email) {
            delete contact.email
        }
        const response = await axios.post(
            `${config.BASE_BACKEND_URL}/contact/update/${contactId}`,
            { data: contact },
            {
                headers: {
                    authorization: `Basic ${localStorage.getItem(
                        "token"
                    )}`,
                },
            }
        )

        return response.data.data.contact as Contact
    } catch (error) {
        const errorMessage = (
            (error as AxiosError).response?.data as any
        ).message
        if (
            errorMessage === "Invalid Token" ||
            errorMessage === "Token Expire"
        ) {
            return logout()
        }
        throw new Error(errorMessage)
    }
}

export const getSingleContact = async (
    contactId: string
) => {
    try {
        const response = await axios.get(
            `${config.BASE_BACKEND_URL}/contact/${contactId}`,
            {
                headers: {
                    authorization: `Basic ${localStorage.getItem(
                        "token"
                    )}`,
                },
            }
        )
        return response.data.data.contact as Contact
    } catch (error) {
        const errorMessage = (
            (error as AxiosError).response?.data as any
        ).message
        if (
            errorMessage === "Invalid Token" ||
            errorMessage === "Token Expire"
        ) {
            return logout()
        }
        throw new Error(errorMessage)
    }
}

export const getAllUserContacts = async () => {
    try {
        const response = await axios.get(
            `${config.BASE_BACKEND_URL}/contact`,
            {
                headers: {
                    authorization: `Basic ${localStorage.getItem(
                        "token"
                    )}`,
                },
            }
        )

        return response.data.data.contacts as Contact[]
    } catch (error) {
        const errorMessage = (
            (error as AxiosError).response?.data as any
        ).message
        if (
            errorMessage === "Invalid Token" ||
            errorMessage === "Token Expire"
        ) {
            return logout()
        }
        throw new Error(errorMessage)
    }
}

export const deleteContact = async (contactId: string) => {
    try {
        await axios.delete(
            `${config.BASE_BACKEND_URL}/contact/${contactId}`,
            {
                headers: {
                    authorization: `Basic ${localStorage.getItem(
                        "token"
                    )}`,
                },
            }
        )
    } catch (error) {
        const errorMessage = (
            (error as AxiosError).response?.data as any
        ).message
        if (
            errorMessage === "Invalid Token" ||
            errorMessage === "Token Expire"
        ) {
            return logout()
        }
        throw new Error(errorMessage)
    }
}

export const logout = () => {
    axios.post(
        `${config.BASE_BACKEND_URL}/account/logout}`,
        {
            headers: {
                authorization: `Basic ${localStorage.getItem(
                    "token"
                )}`,
            },
        }
    )

    localStorage.clear()
    window.location.href = "/"
}
