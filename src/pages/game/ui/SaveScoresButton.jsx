import Button from "@mui/material/Button";
import {$storeScore, eventInBank} from '../model'

export default function SaveScoresButton() {
    const onClick = () => {
        eventInBank();
    }
    return (
        <Button onClick={onClick}>
            Save Scores
        </Button>
    )
}
