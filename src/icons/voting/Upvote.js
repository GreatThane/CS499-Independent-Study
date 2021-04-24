import {SvgIcon} from "@material-ui/core";

export default function Upvote(props) {
    return (
        <SvgIcon fontSize="large" viewBox="0 0 36 36">
            <path fill={props.color} d="M2 26h32L18 10 2 26z"/>
        </SvgIcon>
    )
}
