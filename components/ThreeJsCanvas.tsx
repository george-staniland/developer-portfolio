'use client'

import { Object3DNode, extend } from "@react-three/fiber"
// @ts-ignore
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
// @ts-ignore
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { Grid, CameraControls, Center, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import BioRhyme from '../public/fonts/BioRhyme_Regular.json'
import { useMediaQuery } from "react-responsive"

extend({ TextGeometry })

declare module "@react-three/fiber" {
    interface ThreeElements {
        textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
    }
}

export default function ThreeJsCanvas() {
    const isTablet = useMediaQuery({ query: '(min-width: 992px)' })
    return (
        <>
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 1.1, 10]} rotation={[0, 0, 0]} fov={isTablet ? 60 : 117} />
                <CameraControls maxDistance={20} minDistance={2} />
                <CustomLight1 />
                <ambientLight intensity={0.1} />
                <Text />
                <Ground />
            </Canvas>
        </>
    )
}

function CustomLight1() {
    return (
        <spotLight intensity={1.1} position={[18, 11, 10]} />
    )
}

function Text() {
    const font = new FontLoader().parse(BioRhyme)

    return (
        <group>
            <Center disableY>
                <mesh position={[0, 2.2, 0]} >
                    <textGeometry args={['Thanks for stopping by', { font, size: 2, height: 1 }]} />
                    <meshStandardMaterial color="cornflowerblue" roughness={0.2} metalness={0.3} />
                </mesh>
            </Center>
        </group>
    )
}

function Ground() {
    const gridConfig = {
        cellSize: 0.5,
        cellThickness: 0.5,
        cellColor: '#6f6f6f',
        sectionSize: 3,
        sectionThickness: 1,
        sectionColor: '#9d4b4b',
        fadeDistance: 100,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true
    }
    return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
}



