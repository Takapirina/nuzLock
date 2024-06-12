import Orologio from "../widgetRandom/orologio/orologio";
import TrainerCard from "./trainerCard";

function ProvaPagina () {
    return (
        <div>
            <TrainerCard id={1}/>
            <Orologio />
        </div>
    );
}

export default ProvaPagina;