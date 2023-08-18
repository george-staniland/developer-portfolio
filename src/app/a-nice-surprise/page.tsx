import Image from 'next/image';
import Footer from "../../../components/Footer"
import getGif from '../../../utils/getGif'
import DisplayGif from '../../../components/DisplayGif';


export default async function SurprisePage() {
    const gifUrl = await getGif();
    return (
        <>
            <DisplayGif gifUrl={gifUrl} />
            <Footer />
        </>
    )
}