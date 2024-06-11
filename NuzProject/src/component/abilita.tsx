import { Abilita } from "../service/models";

interface AbilitaComponentProps {
    className:string;
    ability: Abilita;
}
function AbilitaComponent({ ability,className }: AbilitaComponentProps) {
    return (
        <>
        {ability.nome!=""? <div className={className}> 
                {ability.nome}
                <span className="rarity">{ability.rarita}</span>
            </div>:null}
        </>
    )
}
export default AbilitaComponent;