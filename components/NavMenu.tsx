"use client"
import styles from './styles/nav.module.css'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import Link from 'next/link'
import icon from 'public/nav_icon.png'
import Image from 'next/image'

interface Props {
    showHomeLink: boolean;
}

export default function NavMenu(props: Props) {
    const { showHomeLink = false } = props;
    const [showMenu, setShowMenu] = useState(false)
    const path = usePathname();

    const style = useSpring({
        left: showMenu ? '40%' : '100%',
    })

    const overlayClose = useSpring({
        backgroundColor: showMenu ? '#0000006b' : '#ffffff00',
        config: config.molasses,
    })

    useEffect(() => {
        setShowMenu(false)
    }, [path])

    return (
        <div className={styles.nav_overlay} >
            {showHomeLink ?
                <div className={styles.home_link} >
                    <Link href="/">Home {'\u2197'}</Link>
                </div> :
                null
            }
            <div className={styles.nav_icon_wrap} onClick={() => setShowMenu(!showMenu)}>
                <Image src={icon} alt="circular menu open icon" width={30} height={30} priority />
            </div>
            <animated.div
                className={`${styles.close_menu} ${showMenu ? 'allow_pointer' : 'no_pointer'}`}
                onClick={() => setShowMenu(false)}
                style={overlayClose}
            />
            <animated.div className={styles.nav_menu_container} style={style}>
                <div className={styles.menu_inner}>
                    <Link className={styles.menu_item} href="/">Home</Link>
                    <Link className={styles.menu_item} href="/contact">Contact Me</Link>
                    <Link className={styles.menu_item} href="/a-nice-surprise">A Nice Surprise</Link>
                </div>
            </animated.div>
        </div>
    )
} 