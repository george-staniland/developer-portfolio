import { ReactNode } from "react";

// CS = Code Snippet

export default function Cs({ children }: { children: ReactNode }) {
    return <span className="code-snippet">{children}</span>;
}
