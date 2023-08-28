
import ContactFrom from '../../../components/ContactForm'
import styles from './styles.module.css'

export default function Contact() {

    return (
        <>
            <div className={styles.title_wrap} >
                <h1>Contact</h1>
            </div>
            <ContactFrom />
        </>
    )
}