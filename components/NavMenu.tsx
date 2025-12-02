// "use client"

// import styles from './styles/nav.module.css'
// import { usePathname } from 'next/navigation'
// import { useState, useEffect } from 'react'
// import { useSpring, animated, config } from '@react-spring/web'
// import { useHover } from '@use-gesture/react'
// import Link from 'next/link'
// import Image from 'next/image'

// interface Props {
//     showHomeLink: boolean;
// }

// export default function NavMenu(props: Props) {
//     const { showHomeLink = false } = props;
//     const [showMenu, setShowMenu] = useState(false)
//     const [iconHovered, setIconHovered] = useState(false)
//     const path = usePathname();

//     const style = useSpring({
//         left: showMenu ? '40%' : '100%',
//     })

//     const iconStyle = useSpring({
//         height: iconHovered ? '35px' : '30px',
//         width: iconHovered ? '35px' : '30px',
//         config: config.wobbly,
//     })

//     const overlayClose = useSpring({
//         backgroundColor: showMenu ? 'rgba(0, 0, 0, 0.09)' : 'rgba(0, 0, 0, 0)',
//         config: config.molasses,
//     })

//     useEffect(() => {
//         setShowMenu(false)
//     }, [path])

//     const bind = useHover(({ hovering }) => {
//         setIconHovered(hovering ? true : false)
//     });

//     return (
//         <div className={styles.nav_overlay} >
//             {showHomeLink ?
//                 <div className={styles.home_link} >
//                     <Link href="/">Home {'\u2197'}</Link>
//                 </div> :
//                 null
//             }
//             <animated.div
//                 className={styles.nav_icon_wrap}
//                 onClick={() => setShowMenu(!showMenu)}
//                 style={iconStyle}
//                 {...bind()}
//             >
//                 <Image
//                     src={icon}
//                     alt="circular menu open icon"
//                     fill
//                     sizes="40px"
//                     priority
//                     className={styles.nav_icon}
//                 />
//             </animated.div>
//             <animated.div
//                 className={`${styles.close_menu} ${showMenu ? 'allow_pointer' : 'no_pointer'}`}
//                 onClick={() => setShowMenu(false)}
//                 style={overlayClose}
//             />
//             <animated.div className={styles.nav_menu_container} style={style}>
//                 <div className={styles.menu_inner}>
//                     <Link className={styles.menu_item} href="/">Home</Link>
//                     <Link className={styles.menu_item} href="/a-nice-surprise">A Nice Surprise</Link>
//                 </div>
//             </animated.div>
//         </div>
//     )
// } 