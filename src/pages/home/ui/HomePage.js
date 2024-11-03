import * as React from 'react';
import {Box, Container} from "@mui/material";
import Grid from '@mui/material/Grid2';
import TrueBtn from "./TrueBtn";
import FalseBtn from "./FalseBtn";
import Bank from "./Bank";
import GameTimer from "./GameTimer";
import {eventStartGame} from "../../../entities/game"

export default function HomePage(){
    React.useEffect(() => {
        eventStartGame()
    })
    return (
        <div>
            <Container fixed>
                <Box>
                    <h1>Question</h1>
                </Box>
                <Box>
                    <Grid container spacing={1}>
                        <Grid size={1}>
                            <TrueBtn/>
                        </Grid>
                        <Grid size={1}>
                            <FalseBtn/>
                        </Grid>
                        <Grid size={1}>
                            <Bank/>
                        </Grid>
                        <Grid size={1}>
                            <GameTimer/>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}