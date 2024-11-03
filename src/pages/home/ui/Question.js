import {$storeQuestionPrice} from "../../../entities/game";
import {useUnit} from "effector-react";

export default function Question () {
    const count = useUnit($storeQuestionPrice)
    return(
        <h1>
            {count}
        </h1>
    )
}