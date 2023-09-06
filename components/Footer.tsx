import styles from './styles/footer.module.css'
import Link from 'next/link'

export default function Footer() {
    return (
        <div className={styles.footer_container}>
            <Link href="/">Home</Link>
            <Link href="/contact">Contact Me</Link>
            <Link href="/a-nice-surprise">A Nice Surprise</Link>
        </div>
    )
}