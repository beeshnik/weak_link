import React from "react";
import {Button} from "@mui/material";
import { $storeIsClickable, eventGetAnswer} from "../../../entities/game";
import {useUnit} from "effector-react";

export default function FalseBtn() {
    const onClick = () =>  eventGetAnswer('no')
    const isClickable = useUnit($storeIsClickable)
    return (
        <Button
            onClick={onClick}
            variant="contained"
            color={"error"}
            disabled={!isClickable}
        >
            No
        </Button>
    )
}