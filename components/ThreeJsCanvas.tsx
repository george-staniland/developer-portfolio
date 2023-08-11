'use client'

import { useRef, memo } from "react"
import { extend } from "@react-three/fiber"
import { Grid, AccumulativeShadows, RandomizedLight, CameraControls, useHelper, Center, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Mesh, SpotLightHelper } from "three"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import BioRhyme from '../public/fonts/BioRhyme_Regular.json'

extend({ TextGeometry })

declare module "@react-three/fiber" {
    interface ThreeElements {
        textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
    }
}

export default function ThreeJsCanvas() {
    return (
        <>
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 9, 10]} rotation={[0, 0, 0]} fov={60} />
                <CameraControls maxDistance={20} minDistance={2} />
                <CustomLight1 />
                {/* <CustomLight2 /> */}
                <Text />
            </Canvas>
        </>
    )
}

function CustomLight1() {
    // const LightRef = useRef();
    // useHelper(LightRef, SpotLightHelper, 'red')
    return (
        <spotLight intensity={1.1} position={[18, 11, 10]} castShadow />
    )
}

function CustomLight2() {
    const LightRef = useRef();
    useHelper(LightRef, SpotLightHelper, 'cyan')
    return (
        <spotLight ref={LightRef} intensity={0.5} position={[3, 4, 30]} castShadow />
    )
}

function Text() {
    const meshRef = useRef<Mesh>(null);
    const font = new FontLoader().parse(BioRhyme)

    return (
        <group>
            <Center disableY>
                <mesh ref={meshRef} castShadow position={[0, 2, 0]}>
                    <textGeometry args={['Thanks for stopping by', { font, size: 2, height: 1 }]} />
                    <meshStandardMaterial color="cornflowerblue" />
                </mesh>
            </Center>
            <Ground />
            <Shadows />
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

const Shadows = memo(() => (
    <AccumulativeShadows temporal frames={100} color="#9d4b4b" colorBlend={0.5} alphaTest={0.9} scale={20}>
        <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
    </AccumulativeShadows>
))