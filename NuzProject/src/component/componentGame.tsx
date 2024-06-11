import { ReactNode } from "react";

interface ComponentGameProps{
    className?: string;
    children?: ReactNode;
}

function ComponentGame({className,children}:ComponentGameProps) {
    return (
        <>
            <div className={className}>
                {children? children: "game"}
            </div>
        </>
    )
}
export default ComponentGame;