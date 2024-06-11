interface ComponentGameProps{
    className?: string;
}

function ComponentGame({className}:ComponentGameProps) {
    return (
        <>
            <div className={className}>
                Game
            </div>
        </>
    )
}
export default ComponentGame;