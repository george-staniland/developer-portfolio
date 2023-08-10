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
        // meshRef.current.rotation.y += 0.002;
    })

    return (
        <mesh ref={meshRef} position={[50, 0, 0]}>
            <textGeometry args={['Thanks for stopping by', { font, size: 12, height: 6 }]} />
            <meshLambertMaterial color={'red'} />
        </mesh>
    )
}

export default function R3FTest() {
    return (
        <>
            <Canvas>
                <PerspectiveCamera makeDefault position={[50, 0, 1000]} fov={3} />
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} />
                <Text />
            </Canvas>
        </>
    )
}