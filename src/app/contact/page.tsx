
import ContactFrom from '../../../components/ContactForm'
import styles from './styles.module.css'
import Link from 'next/link'

export default function Contact() {

    return (
        <>
            <div className={styles.title_wrap} >
                <Link href="/">Home {'\u2197'}</Link>
                <h1>Contact Me</h1>
            </div>
            <ContactFrom />
        </>
    )
}