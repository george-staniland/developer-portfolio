"use client"
import styles from './contactform.module.css'
import { useForm } from 'react-hook-form'

export default function ContactFrom() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    });

    // Enum for our statuses
    const contactStatuses = {
        loading: 'loading',
        submitted: 'submitted',
        error: 'error'
    };

    async function handleSubmit(event: any) {
        event.preventDefault();
        const data = {
            name: String(event.target.name.value),
            email: String(event.target.email.value),
            message: String(event.target.message.value),
        }
        fetch("/api/contact-form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        .then((res) => {
            if (res.ok) {
                // If we got an 'ok' response from fetch,
                // clear the AbortController timeout

                return res.json();
            }
            // If the response was anything besides 'ok', throw an error 
            // to hit our .catch() block
            throw new Error('Whoops! Error sending email.');
        })
            .then((res) => {
                // On a successful search, set the status to 'submitted' and 
                // reset the fields
                console.log(res)
            })
            .catch((err) => {
                // There was an error, catch it and set the status to 'error'
                console.log(err)
            });

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.form_element}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        required
                        autoComplete="off"
                    />
                </div>
                <div className={styles.form_element}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        autoComplete="off"
                    />
                </div>
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                        rows={4}
                        name="message"
                        required
                        minLength={10}
                        maxLength={500}
                        placeholder="Message"
                    />
                </div>
                <button
                    type="submit"
                >
                    Send
                </button>
            </form>
        </div>
    )
}