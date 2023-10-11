"use client"
import styles from './styles/animation.module.css'
import { useRef, useEffect, useState } from 'react'

export default function HomePageAnimation() {
    const [imgWidth, setImgWidth] = useState(0)
    const [imgHeight, setImgHeight] = useState(0)
    const pauseAnimation = useRef<Boolean>(false)
    const canvasRef = useRef<null | HTMLCanvasElement>(null)
    let xPos = useRef<number>(0)
    const step = 3

    interface Props {
        context: CanvasRenderingContext2D | undefined | null,
        xPos: {
            current: number;
        },
    }

    useEffect(() => {
        if (window.innerWidth > 749) {
            setImgWidth(180)
            setImgHeight(imgWidth / 1.4)
        } else {
            setImgWidth(100)
            setImgHeight(imgWidth / 1.4)
        }
    }, [imgWidth, imgHeight])

    useEffect(() => {

        if (canvasRef.current != null) {
            canvasRef.current.width = window.innerWidth
            canvasRef.current.height = imgHeight + 5
        }

        let animationId: number

        const context = canvasRef.current?.getContext('2d');
        let direction = "right"

        function renderer() {
            if (!pauseAnimation.current) {
                if (+xPos.current < window.innerWidth - imgWidth && direction == "right") {
                    xPos.current = xPos.current + step
                } else {
                    direction = "left"
                }

                if (direction == "left" && +xPos.current > 0) {
                    xPos.current = xPos.current - step
                } else {
                    direction = "right"
                }
                const args = {
                    context: context,
                    xPos: xPos,
                }
                draw(args)
            } else {
                const args = {
                    context: context,
                    xPos: xPos,
                }
                draw(args)
            }
            animationId = window.requestAnimationFrame(renderer)
        }
        renderer()

        return () => {
            window.cancelAnimationFrame(animationId)
        }
    })

    function draw(props: Props) {
        const { context, xPos } = props;
        const image = new Image()
        image.src = "/donut.png";
        image.onload = () => {
            context?.clearRect(0, 0, context.canvas.width, context.canvas.height)
            context?.drawImage(image, xPos.current, 0, imgWidth, imgHeight);
        }
    }

    function handlePause() {
        pauseAnimation.current = !pauseAnimation.current
    }

    return (
        <div
            className={styles.container}
        >
            <canvas
                ref={canvasRef}
                className={styles.canvas}
                onClick={() => handlePause()}
            />
        </div>
    )
}