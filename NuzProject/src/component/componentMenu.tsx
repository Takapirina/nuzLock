import { ReactNode } from 'react';

interface ComponentMenuProps{
    className?: string;
    children?: ReactNode; 
}

function ComponentMenu({className,children}:ComponentMenuProps) {
    return (
        <>
            <div className={className}>
                {children ? children : "menu"}
            </div>
        </>
    )
}
export default ComponentMenu;