interface TipoComponentProps{
    tipo: string;
}

function TipoComponent({tipo}:TipoComponentProps){
    return(
        <>
        {tipo!=""? <div>{tipo}</div>:null}
        </>
    )
}
export default TipoComponent;