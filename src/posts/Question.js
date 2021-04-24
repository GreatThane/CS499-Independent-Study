import {Grid} from "@material-ui/core";
import ResponseBlock from "./ReponseBlock";
import {array} from "prop-types";
import {useState} from "react";

export default function Question(props) {
    const [responses, setResponses] = useState(props.children.flat(Infinity));
    return (
        <Grid container direction="column" spacing={3}>
            <Grid item>
                <h2 style={{padding: 0, margin: 0}}>{props.title}</h2>
            </Grid>
            {responses.map((post, i) => (
                    <Grid item key={i}>
                        {post}
                    </Grid>
                )
            )}
            <Grid item>
                <ResponseBlock responses={[responses, setResponses]} question_id={props.id}/>
            </Grid>
        </Grid>
    )
}
