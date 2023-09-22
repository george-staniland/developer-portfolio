"use client"

import styles from './styles/animation.module.css'
import { useRef, useEffect } from 'react'

export default function HomePageAnimation() {

    const canvasRef = useRef(null)
    const windowWidth = useRef(window.innerWidth);

    function draw(context: CanvasRenderingContext2D, count: number) {
        // context.fillStyle = 'white';
        // context.fillRect(0, 0, context.canvas.width, context.canvas.height)

        const image = new Image();
        const delta = count % windowWidth.current;
        image.src = "/test.png";
        image.onload = () => {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height)
            context.drawImage(image, 0 + delta, 0);
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = windowWidth.current
        canvas.height = 400
        let count = 0
        let animationId: number

        const context = canvas.getContext('2d');

        function renderer() {
            count = count + 2.8
            draw(context, count)
            animationId = window.requestAnimationFrame(renderer)
        }
        renderer()


        // draw(context, 100)


        return () => window.cancelAnimationFrame(animationId)
    }, [])

    return (
        <div
            className={styles.container}

        >
            <canvas
                ref={canvasRef}
                className={styles.canvas}
                height="400px"
            />
        </div>
    )
}