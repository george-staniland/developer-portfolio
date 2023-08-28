"use client"
import styles from './nav.module.css'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import Link from 'next/link'
import icon from 'public/nav_icon.png'
import Image from 'next/image'


export default function NavMenu() {
    const [showMenu, setShowMenu] = useState(false)
    const path = usePathname();

    const props = useSpring({
        left: showMenu ? '40%' : '100%',
    })

    useEffect(() => {
        setShowMenu(false)
    }, [path])

    return (
        <div className={styles.nav_overlay} >
            <div className={styles.nav_icon_wrap} onClick={() => setShowMenu(!showMenu)}>
                <Image src={icon} alt="circular menu open icon" width={30} height={30} />
            </div>
            <animated.div className={styles.nav_menu_container} style={props}>
                <div className={styles.menu_inner}>
                    <Link className={styles.menu_item} href="/">Home</Link>
                    <Link className={styles.menu_item} href="/contact">Contact Me</Link>
                    <Link className={styles.menu_item} href="/a-nice-surprise">A Nice Surprise</Link>
                </div>
            </animated.div>
        </div>
    )
} 