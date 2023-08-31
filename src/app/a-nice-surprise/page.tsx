import styles from './styles.module.css'
import DisplayGif from '../../../components/DisplayGif';
import NavMenu from '../../../components/NavMenu';

export default async function SurprisePage() {

    return (
        <>
            <NavMenu showHomeLink />
            <DisplayGif />
        </>
    )
}