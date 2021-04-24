import {Avatar, Divider, Grid, Tooltip} from "@material-ui/core";
import Author from "../icons/Author";

export default function UserComment(props) {
    return (
        <Grid container wrap="nowrap" {... props.id ? {id: props.id} : {}}>
            <Grid item container xs={1} style={{marginBottom: "12px", minWidth: "64px"}} justify="flex-start"
                  alignItems="center" direction="column">
                <Grid item>
                    <Author accountId={props.author}/>
                </Grid>
            </Grid>
            <Grid item style={{overflowWrap: "break-word"}} xs>{props.children}</Grid>
        </Grid>
    )
}
