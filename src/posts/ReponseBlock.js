import {Button, Paper, TextField, useRadioGroup} from "@material-ui/core";
import {useContext, useEffect, useState} from "react";
import SAMLContext from "../contexts/SAMLContext";
import Box from "@material-ui/core/Box";
import Post from "./Post"

export default function ResponseBlock(props) {
    const [answer, setAnswer] = useState("");
    const [responses, setResponses] = props.responses;
    const {accountID} = useContext(SAMLContext);

    if (!accountID) return <></>
    return (
        <Paper>
            <Box py={2} px={4}>
                <Box pb={2}>
                    <TextField
                        fullWidth
                        multiline
                        onChange={event => setAnswer(event.target.value)}
                        value={answer}
                        styles={{paddingBottom: 12}}
                    />
                </Box>
                <Button
                    variant={"outlined"}
                    onClick={async () => {
                    const requestOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({content: answer, author: accountID})
                    };
                    const res = await (await fetch(`../api/v1/question/${props.question_id}/respond`, requestOptions)).json();
                    let newResponses = [];
                    for (let i of responses) {
                        newResponses.push(i);
                    }
                    newResponses.push(<Post key={responses.length - 1} question_id={props.question_id} post_id={res.id} content={answer} votes={0} author={accountID} id={'answer-' + res.id}/>);
                    setResponses(newResponses);
                    setAnswer("");
                }}>Submit</Button>
            </Box>
        </Paper>
    )
}
