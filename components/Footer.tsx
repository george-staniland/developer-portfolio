import styles from './footer.module.css'

export default function Footer() {
    return (
        <div className={styles.footer_container}>
            <div className={styles.footer_container_inner}>
                <a href="/">Home</a>
                <a href="/contact">Contact Me</a>
                <a href="/a-nice-surprise">A Nice Surprise</a>
            </div>
        </div>
    )
}