
import ContactFrom from '../../../components/ContactForm'
import NavMenu from '../../../components/NavMenu'
import styles from './styles.module.css'

export default function Contact() {

    return (
        <>
            <NavMenu showHomeLink />
            {/* <div className={styles.title_wrap} >
                <h1>Contact Me</h1>
            </div> */}
            <div className={styles.container}>
                <ContactFrom />
            </div>
        </>
    )
}