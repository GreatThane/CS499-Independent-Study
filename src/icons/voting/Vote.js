import {Grid, IconButton} from "@material-ui/core";
import Upvote from "./Upvote";
import Downvote from "./Downvote";
import {useContext, useEffect, useState} from "react";
import SAMLContext from "../../contexts/SAMLContext";

export default function Vote(props) {
    const {accountID} = useContext(SAMLContext);
    const [state, setState] = useState({
        upvoteColor: "gray",
        voteStatus: 0,
        downvoteColor: "gray",
        count: parseInt(props.children)
    });
    useEffect(async () => {
        if (!accountID) return;
        const res = await (await fetch(`../api/v1/post/${props.post_id}/vote_status?author=${accountID}`)).json();
        switch (res) {
            case -1:
                setState({
                    downvoteColor: "#F44336",
                    upvoteColor: state.upvoteColor,
                    voteStatus: res,
                    count: state.count
                });
                break;
            case 1:
                setState({
                    upvoteColor: "#4CAF50",
                    voteStatus: res,
                    downvoteColor: state.downvoteColor,
                    count: state.count
                });
                break;
        }
    }, [accountID]);

    return (
        <Grid container justify="flex-start" alignItems="center" direction="column">
            <Grid item xs={12}>
                <IconButton style={{padding: 0}} onClick={async () => {
                    if (!accountID) {
                        window?.alert("Must be signed in to vote!");
                        return;
                    }
                    const newVoteStatus = state.voteStatus === 1 ? 0 : 1;
                    setState({
                        voteStatus: newVoteStatus,
                        upvoteColor: newVoteStatus === 0 ? "gray" : "#4CAF50",
                        downvoteColor: "gray",
                        count: state.count + (newVoteStatus - state.count)
                    });
                    const requestOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({author: accountID, vote: newVoteStatus})
                    };
                    const res = await fetch(`../api/v1/post/${props.post_id}/vote`, requestOptions);
                }}>
                    <Upvote color={state.upvoteColor}/>
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <h3 style={{margin: 0}}>{state.count}</h3>
            </Grid>
            <Grid item xs={12}>
                <IconButton style={{padding: 0}} onClick={async () => {
                    if (!accountID) {
                        window?.alert("Must be signed in to vote!");
                        return;
                    }
                    const newVoteStatus = state.voteStatus === -1 ? 0 : -1;
                    setState({
                        voteStatus: newVoteStatus,
                        upvoteColor: "gray",
                        downvoteColor: newVoteStatus === 0 ? "gray" : "#F44336",
                        count: state.count + (newVoteStatus - state.count)
                    });
                    const requestOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({author: accountID, vote: newVoteStatus})
                    };
                    const res = await fetch(`../api/v1/post/${props.post_id}/vote`, requestOptions);
                    // console.log(await res.json());
                }}>
                    <Downvote color={state.downvoteColor}/>
                </IconButton>
            </Grid>
        </Grid>
    )
}
