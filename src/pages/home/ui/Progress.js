import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useUnit} from "effector-react";
import {$storeScoreBank, bankMax} from "../../../entities/game";

function LinearProgressWithLabel(props) {
    const progress = Math.round(bankMax - $storeScoreBank.getState())
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {`${progress >= 0 ? progress : 0}`}
                </Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};


export default function Progress() {
    const count = useUnit($storeScoreBank)

    return <LinearProgressWithLabel value={count / bankMax * 100 > 100 ? 100 : count / bankMax * 100}
                                    color="success" size="30%"/>
}
