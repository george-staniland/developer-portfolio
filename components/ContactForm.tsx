"use client"
import { useState } from 'react';
import styles from './styles/contactform.module.css'
import { useForm } from 'react-hook-form'

export default function ContactFrom() {
    const [status, setStatus] = useState('');
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

    const onSubmit = (data: any, e: any) => {
        // Used to Abort a long running fetch.
        const abortLongFetch = new AbortController();
        // Abort after 7 seconds.
        const abortTimeoutId = setTimeout(() => abortLongFetch.abort(), 700000);

        // Don't want to actually submit the form
        e.preventDefault();

        // Loading
        setStatus(contactStatuses.loading);

        // You can change this fetch URL to a bad url to see the .catch() block hit
        // Example: '/api/contact-bad'
        fetch('/api/contact-form', {
            signal: abortLongFetch.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.ok) {
                    // If we got an 'ok' response from fetch, clear the AbortController timeout
                    clearTimeout(abortTimeoutId);
                    console.log('res . ok')
                    return res.json();
                }
                // If the response was anything besides 'ok', throw an error to hit our .catch() block
                throw new Error('Whoops! Error sending email.');
            })
            .then((res) => {
                // On a successful search, set the status to 'submitted' and reset the fields
                setStatus(contactStatuses.submitted);
                alert('Message sent :)')
                reset();
            })
            .catch((err) => {
                // There was an error, catch it and set the status to 'error'
                console.log(err)
                console.log('catch block')
                alert('Message sending failed. Please try again')
                setStatus(contactStatuses.error);
            });
    };


    // Email Form Validation RegEx used in client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Standard error message for required form fields
    const requiredFieldErrorMsg = 'This field is required';

    return (
        <div className={styles.form_wrap}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.contact_form}>
                <div className={styles.form_element}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="contactName"
                        type="text"
                        aria-describedby="name-error"
                        autoComplete="name"
                        placeholder="Name"
                        {...register('name', { required: requiredFieldErrorMsg })}
                    />
                    {errors.name && (
                        <span id="name-error" className="formValidationError">
                            This field is required
                        </span>
                    )}
                </div>

                <div className={styles.form_element}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="contactEmail"
                        type="email"
                        aria-describedby="email-error"
                        autoComplete="name"
                        placeholder="Email"
                        {...register('email', {
                            required: requiredFieldErrorMsg,
                            pattern: {
                                value: emailRegex,
                                message:
                                    'A valid email address id required. Example: name@domain.com.'
                            }
                        })}
                    />

                </div>
                <div className={styles.form_element}>
                    <label htmlFor="message" className="form-label">
                        Message
                    </label>
                    <textarea
                        id="contactMessage"
                        rows={5}
                        placeholder='Message'
                        aria-describedby="message-error"
                        {...register('message', {
                            required: requiredFieldErrorMsg
                        })}
                    ></textarea>
                    {errors.message && (
                        <span id="message-error" className="formValidationError">
                            Error
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    className={styles.submit_button}
                >
                    Send Message
                </button>
            </form>
        </div>
    )
}