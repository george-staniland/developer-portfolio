"use client"
import styles from './styles/animation.module.css'
import { useRef, useEffect, useState } from 'react'

export default function HomePageAnimation() {
    const [windowWidth, setWindowWidth] = useState(0)
    const canvasRef = useRef<null | HTMLCanvasElement>(null)
    const imageWidth = 300

    function handleResize() {
        setWindowWidth(window.innerWidth)
    }

    interface Props {
        context: CanvasRenderingContext2D | undefined | null,
        xPos: number,
    }

    function draw(props: Props) {
        const { context, xPos } = props;
        const image = new Image();
        image.src = "/test.png";
        image.onload = () => {
            context?.clearRect(0, 0, context.canvas.width, context.canvas.height)
            context?.drawImage(image, xPos, 0, imageWidth, 200);
        }
    }

    useEffect(() => {

        if (canvasRef.current != null) {
            canvasRef.current.width = window.innerWidth
            canvasRef.current.height = 200
        }

        let xPos = 0
        let animationId: number

        const context = canvasRef.current?.getContext('2d');

        function renderer() {

            if (xPos < window.innerWidth - imageWidth) {
                xPos = xPos + 2.8
            } else {
                xPos = 0
            }

            const args = {
                context: context,
                xPos: xPos,
            }
            draw(args)
            animationId = window.requestAnimationFrame(renderer)
        }
        renderer()


        // Resize
        window.addEventListener('resize', handleResize)

        return () => {
            window.cancelAnimationFrame(animationId)
            window.removeEventListener('resize', handleResize)
        }
    })

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