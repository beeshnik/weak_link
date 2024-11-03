import { $storeScoreBank } from "../../../entities/game";
import {useUnit} from "effector-react";

export default function Bank () {
    const count = useUnit($storeScoreBank)
    return(
        <h1>
            {count}
        </h1>
    )
}