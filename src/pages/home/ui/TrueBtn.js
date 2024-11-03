import React from "react";
import {Button} from "@mui/material";
import {$storeIsClickable, eventGetAnswer} from "../../../entities/game";
import {useUnit} from "effector-react";

export default function TrueBtn() {
    const onClick = () => eventGetAnswer("yes")
    const isClickable = useUnit($storeIsClickable)
    return (
        <Button
            onClick={onClick}
            variant="contained"
            color="success"
            disabled={!isClickable}
        >
            True answer
        </Button>
    )
}