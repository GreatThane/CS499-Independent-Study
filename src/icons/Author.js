import {Avatar, Toolbar, Tooltip} from "@material-ui/core";
import {useContext, useEffect, useState} from "react";
import SAMLContext from "../contexts/SAMLContext";

/**
 *
 * @param {string} [props.children] Author name
 * @param {string} [props.src] Source address
 * @param {string} [props.base64] Base64 image data
 * @param {string} [props.accountId] Microsoft account ID for acquiring name and profile picture
 * @returns {JSX.Element}
 * @constructor
 */
export default function Author(props) {
    if (props.accountId) {
        const [name, setName] = useState(props.accountId);
        const [avatar, setAvatar] = useState(<Avatar>{' '}</Avatar>);

        const {client} = useContext(SAMLContext);
        useEffect(async () => {
            let r;
            try {
                r = await client?.api(`/users/${props.accountId}`).get();
                if (!r) return;
            } catch (e) {
                return;
            }

            setName(r.displayName);
            setAvatar(<Avatar>{r.displayName.split(' ').map(s => s[0]).join('')}</Avatar>);

            // TODO: I don't really have a way to test photos atm. Probably doesn't work at all.
            try {
                r = await client?.api(`/users/${props.accountId}/photo/$value`).get();
                if (!r) return;
            } catch (e) {
                return;
            }
            setAvatar(<Avatar src={`data:image/png;base64,${btoa(unescape(encodeURIComponent(r)))}`} alt={name}/>);

        }, [client])

        return (
            <Tooltip title={name}>
                {avatar}
            </Tooltip>
        )
    }


    const name = props.children.split(' ').map(s => s[0]).join('');
    const avatar = props.src
        ? <Avatar src={props.src} alt={name}/>
        : props.base64
            ? <Avatar src={`data:image/png;base64,${props.base64}`} alt={name}/>
            : <Avatar>{name}</Avatar>;

    return (
        <Tooltip title={props.children}>
            {avatar}
        </Tooltip>
    )
}
