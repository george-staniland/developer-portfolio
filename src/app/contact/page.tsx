
import ContactFrom from '../../../components/ContactForm'
import NavMenu from '../../../components/NavMenu'
import styles from './styles.module.css'

export default function Contact() {

    return (
        <>
            <NavMenu showHomeLink />
            <div className={styles.container}>
                <div className={styles.text_wrap}>
                    <h1 className="small-heading">
                        Contact Me
                    </h1>
                </div>
                <ContactFrom />
            </div>
        </>
    )
}