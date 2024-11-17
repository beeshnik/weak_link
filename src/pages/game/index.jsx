import React from 'react';
import styles from './styles/styles.css';
import Container from '@mui/material/Container';
import AnswerButton from "./ui/AnswerButton";
import Bank from "./ui/Bank";
import SaveScoresButton from "./ui/SaveScoresButton";

export default function GamePage(){
    return (
        <Container fixed>
            <AnswerButton answer={"yes"}/>
            <AnswerButton answer={"no"}/>
            <Bank/>
            <SaveScoresButton />
        </Container>
    )
}
