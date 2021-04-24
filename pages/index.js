import {useRouter} from "next/router";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {Button, ButtonBase, Grid, Paper, TextField} from "@material-ui/core";
import {useContext, useState} from "react";
import SAMLContext from "../src/contexts/SAMLContext";

export default function Index(props) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const {accountID} = useContext(SAMLContext);

    if (!accountID) return (
        <Grid container alignItems={"center"} direction={"column"}>
            <Grid item>
                <h2>Sign in to ask a question!</h2>
            </Grid>
        </Grid>
    )
    return (
        <Container maxWidth="md">
            <Box my={2}>
                <main>
                    <Paper>
                        <Box p={2}>
                            <Box pb={2}>
                            <TextField
                                fullWidth
                                label="Title"
                                inputProps={{maxLength: 50}}
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                                error={title.length >= 50}
                                helperText={title.length >= 50 ? "Title may be at most than 50 characters." : false}
                                variant={"outlined"}
                            />
                            </Box>
                            <Box pb={2}>
                            <TextField
                                fullWidth
                                multiline
                                label="Body"
                                value={body}
                                onChange={event => setBody(event.target.value)}
                                variant={"outlined"}
                            />
                            </Box>
                            <Button onClick={async () => {
                                const requestOptions = {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({content: body, author: accountID, title: title})
                                };
                                const res = await (await fetch(`/api/v1/question/post`, requestOptions)).json();
                                router.push(`/question/${res.id}`);
                            }} variant={"outlined"}>Ask</Button>
                        </Box>
                    </Paper>
                </main>
            </Box>
        </Container>
    )
}
