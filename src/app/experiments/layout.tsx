import Link from "next/link"

export default function experiementLayout ({children} : any) {
    return (
        <section className="experiment__layout px">
            <nav className="experi-nav">
                <Link className="btn" href="/">
                    <span aria-hidden="true">←</span>
                    Back
                </Link>
            </nav>
            {children}
        </section>
    )
}