'use client'

import { useRef, useEffect } from "react"
import { extend } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Mesh, Vector3 } from "three"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import BioRhyme from '../public/fonts/BioRhyme_Regular.json'

extend({ TextGeometry })

declare module "@react-three/fiber" {
    interface ThreeElements {
        textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
    }
}

function Text() {
    const meshRef = useRef<Mesh>(null);
    const font = new FontLoader().parse(BioRhyme)

    useEffect(() => {
        if (!meshRef.current) {
            return;
        }
        meshRef.current.geometry.computeBoundingBox();
        const boundingBox = meshRef.current.geometry.boundingBox;
        const center = new Vector3();
        boundingBox.getCenter(center);
        meshRef.current.geometry.translate(-center.x, -center.y, -center.z);
    })

    useFrame(() => {
        if (!meshRef.current) {
            return;
        }
        meshRef.current.rotation.y += 0.006;
    })

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
            <textGeometry args={['Thanks for stopping by', { font, size: 2, height: 1 }]} />
            <meshStandardMaterial color="cornflowerblue" />
        </mesh>
    )
}

export default function AnimatedText() {
    return (
        <>
            <Canvas>
                <PerspectiveCamera makeDefault position={[6, 0, 40]} fov={10} />
                <pointLight position={[-5, 8, 10]} castShadow />
                <Text />
            </Canvas>
        </>
    )
}