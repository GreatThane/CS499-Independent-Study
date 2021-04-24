import {Avatar, Card, Divider, Grid, Paper, Tooltip} from "@material-ui/core";
import Vote from "../icons/voting/Vote";
import Box from "@material-ui/core/Box";
import Author from "../icons/Author"
import UserComment from "./UserComment";
import CommentBlock from "./CommentBlock";
import {useState} from "react";

/**
 *
 * @param {string} props.content The author's post
 * @param {string} props.author Author of the post
 * @param {number | string} [props.votes=0] The number of votes the post has
 * @param {UserComment[]} [props.children=[]] Comments on the post.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Post(props) {
    const content = props.content;
    const votes = parseInt(props.votes || "0") || 0;
    const [comments, setComments] = useState(props.children?.flat(Infinity) || []);
    return (
        <Paper {... props.id ? {id: props.id} : {}}>
            <Grid container direction="column">
                <Grid item container wrap="nowrap" style={{paddingBottom: "20px", paddingRight: "25px"}}>
                    <Grid item container xs={1} style={{marginBottom: "12px", minWidth: "64px"}} justify="flex-start"
                          alignItems="center" direction="column">
                        <Grid item style={{marginBottom: "10px"}}>
                            <Vote post_id={props.post_id} question_id={props.question_id}>{votes}</Vote>
                        </Grid>
                        <Grid item>
                            <Author accountId={props.author}/>
                        </Grid>
                    </Grid>
                    <Grid item style={{marginTop: "10px", overflowWrap: "break-word"}} xs>{content}</Grid>
                </Grid>
                {comments.map((comment, i) => (
                    <Grid item key={i}>
                        <Divider variant="fullWidth" style={{marginBottom: "15px"}}/>
                        {comment}
                    </Grid>
                ))}
                <Grid item>
                    <CommentBlock post_id={props.post_id} comments={[comments, setComments]}/>
                </Grid>
            </Grid>
        </Paper>
    )
}
