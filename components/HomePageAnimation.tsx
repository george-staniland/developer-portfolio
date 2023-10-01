"use client"
import styles from './styles/animation.module.css'
import { useRef, useEffect, useState } from 'react'

export default function HomePageAnimation() {
    const [windowWidth, setWindowWidth] = useState(0)
    const canvasRef = useRef<null | HTMLCanvasElement>(null)
    const imgWidth = 600
    const imgHeight = imgWidth / 11.2

    function handleResize() {
        setWindowWidth(window.innerWidth)
    }

    interface Props {
        context: CanvasRenderingContext2D | undefined | null,
        xPos: number,
        xPos2: number,
    }

    function draw(props: Props) {
        const { context, xPos, xPos2 } = props;
        const image = new Image()
        const image2 = new Image()
        image.src = "/text_1_cropped.png";
        image2.src = "/sml-donut.png";
        image.onload = () => {
            context?.clearRect(0, 0, context.canvas.width, context.canvas.height)
            context?.drawImage(image, xPos, 0, imgWidth, imgHeight);
            // context?.drawImage(image2, xPos2, 0, 60, 60);
        }
    }

    useEffect(() => {

        if (canvasRef.current != null) {
            canvasRef.current.width = window.innerWidth
            canvasRef.current.height = imgHeight + 5
        }

        let xPos = 0 - imgWidth
        let xPos2 = 0 - 60
        let animationId: number
        const step = 2
        const step2 = 5

        const context = canvasRef.current?.getContext('2d');
        let direction = "right"

        function renderer() {
            if (xPos < window.innerWidth - imgWidth && direction == "right") {
                xPos = xPos + step
                // xPos2 = xPos2 + step2
            } else {
                direction = "left"
            }

            if (direction == "left" && xPos > 0) {
                xPos = xPos - step
                // xPos2 = xPos2 - step2
            } else {
                direction = "right"
            }
            const args = {
                context: context,
                xPos: xPos,
                xPos2: xPos2,
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
            />
        </div>
    )
}