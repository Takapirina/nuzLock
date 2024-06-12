import { Mossa } from "../service/models";

interface MossaComponentProps {
    mossa: Mossa;
}

function MossaComponent({ mossa }: MossaComponentProps) {
    return (
        <>
            <div className="mossa">
               <span>{mossa.nome}</span>
               <span>{mossa.power}</span>
               <span>{mossa.tipo}</span>
            </div>
        </>
    )
}
export default MossaComponent;