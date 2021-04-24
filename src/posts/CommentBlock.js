import {useContext, useState} from "react";
import SAMLContext from "../contexts/SAMLContext";
import {Button, Divider, Grid, TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import UserComment from "./UserComment";

export default function CommentBlock(props) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = props.comments;
    const {accountID} = useContext(SAMLContext);
    const maxLength = props.maxLength || 256;

    if (!accountID) return <></>;

    return (
        <>
            <Divider/>
            <Box px={2} py={1}>
                <TextField
                    fullWidth
                    onChange={event => setComment(event.target.value)}
                    value={comment}
                    inputProps={{maxLength}}
                    error={comment.length >= maxLength}
                    helperText={comment.length >= maxLength ? `Comment may not be more than ${maxLength} characters.` : false}
                />
                <Grid container alignItems={"center"} spacing={1}>
                    <Grid item>
                        <Button onClick={async () => {
                            const requestOptions = {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({content: comment, author: accountID, post_id: props.post_id})
                            }
                            const res = await fetch(`../api/v1/post/${props.post_id}/comment`, requestOptions);
                            let newComments = [];
                            for (let i of comments) {
                                newComments.push(i);
                            }
                            newComments.push(<UserComment author={accountID}>{comment}</UserComment>)
                            setComments(newComments);
                            setComment("");
                        }}>Comment</Button>
                    </Grid>
                    <Grid item><p>{comment.length} / {maxLength}</p></Grid>
                </Grid>
            </Box>
        </>
    )
}
