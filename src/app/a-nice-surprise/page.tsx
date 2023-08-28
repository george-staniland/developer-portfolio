import styles from './styles.module.css'
import DisplayGif from '../../../components/DisplayGif';

export default async function SurprisePage() {

    return (
        <>
            <div className={styles.title_wrap}>
                <h1>A Nice Surprise</h1>
            </div>
            <DisplayGif />
        </>
    )
}