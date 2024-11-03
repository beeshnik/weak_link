import {$storeTimer} from "../../../entities/game";
import {useUnit} from "effector-react";

export default function GameTimer () {
    const count = useUnit($storeTimer)
    return(
        <h1>
            {count/1000}
        </h1>
    )
}