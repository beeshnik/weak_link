import React from 'react';
import Button from "@mui/material/Button";
import { eventGetAnswer } from "../model"

export default function AnswerButton(props) {
    const onClick = () => {
        eventGetAnswer(props.answer)
    }
    const styles = {
        color: {
            yes: "success",
            no: "error",
        }
    }
    return (
        <Button color={styles.color[props.answer]}
                onClick={onClick}
                variant={"contained"}
        >
            {props.answer}
        </Button>
    )
}