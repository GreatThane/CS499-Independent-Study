import {SvgIcon} from "@material-ui/core";

export default function Downvote(props) {
    return (
        <SvgIcon fontSize="large" viewBox="0 0 36 36">
            <path fill={props.color} d="M2 10h32L18 26 2 10z"/>
        </SvgIcon>
    )
}
