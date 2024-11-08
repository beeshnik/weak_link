import * as React from 'react';
import {Box, Container} from "@mui/material";
import Grid from '@mui/material/Grid2';
import TrueBtn from "./TrueBtn";
import FalseBtn from "./FalseBtn";
import Bank from "./Bank";
import GameTimer from "./GameTimer";
import {eventStartGame} from "../../../entities/game"
import Question from "./Question";
import Finish from "./Finish";
import Progress from "./Progress";

export default function HomePage(){
    React.useEffect(() => {
        eventStartGame()
    })
    return (
        <div>
            <Container fixed>
                <Box component={"div"} sx={{
                        height: 400,
                    }}>
                    <Grid container spacing={2} sx={{
                        height: '100%'
                    }}>
                        <Grid size={3}  sx={{
                            height: '100%',
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: '#bedd9a',
                            borderRadius: 5,
                            padding: "10px",
                        }}>
                            Осталось времени
                            <GameTimer/>
                        </Grid>
                        <Grid size={6}  sx={{
                            height: '100%',
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <h1>
                                Вопрос
                            </h1>
                        </Grid>
                        <Grid size={3}  sx={{
                            height: '100%',
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: '#bedd9a',
                            borderRadius: 5,
                            padding: "10px",
                        }}>
                            <Grid container spacing={2} sx={{
                                height: '100%',
                                width: '100%',
                            }}>
                                <Grid size={12}>
                                    <Box sx={{
                                        height: '100%',
                                    }}>
                                        Стоимость вопроса
                                        <Question/>
                                    </Box>
                                </Grid>
                                <Grid size={12}>
                                    <Box sx={{
                                        height: '100%',
                                    }}>
                                        Сумма набранных очков
                                        <Bank/>
                                    </Box>
                                </Grid>
                                <Grid size={12}>
                                    <Box sx={{
                                        height: '100%',
                                    }}>
                                        Требуемое количество очков
                                        <Finish/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box component={"div"} sx={{
                    height: 250,
                }}>
                    <Box sx={{
                        height: '100%',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Box sx={{
                            height: '100%',
                            width: '70%',
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Grid container spacing={2} sx={{
                                height: '100%',
                                width: '100%',
                            }}>
                                <Grid size={6} sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <TrueBtn/>
                                </Grid>
                                <Grid size={6} sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <FalseBtn/>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
                <Box component={"div"} sx={{
                    height: 50,
                }}>
                    <Box sx={{
                        height: '100%',
                        width: '100%',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Box sx={{
                            height: '100%',
                            width: '100%',
                        }}>
                            Прогресс
                            <Progress/>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}