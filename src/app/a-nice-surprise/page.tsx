import styles from './styles.module.css'
import DisplayGif from '../../../components/DisplayGif';
import Link from 'next/link';

export default async function SurprisePage() {

    return (
        <>
            <div className={styles.title_wrap}>
                <Link href="/">Home {'\u2197'}</Link>
                <h1>A Nice Surprise</h1>
            </div>
            <DisplayGif />
        </>
    )
}