import {AppBar, Grid, Hidden, Toolbar} from "@material-ui/core";
import {useState} from "react";
import SearchBar from "material-ui-search-bar";
import LoginButton from "./LoginButton";
import {useRouter} from "next/router";


export default function Header() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container justify="space-between" alignItems="center" wrap="nowrap">
                    <Hidden smDown>
                        <Grid item>
                            <h3>Stack Underflow</h3>
                        </Grid>
                    </Hidden>
                    <Grid item sm md={6}>
                        <SearchBar
                            value={search}
                            onChange={newValue => setSearch(newValue)}
                            onRequestSearch={() => router.push(`/search?search=${search}`)}
                        />
                    </Grid>
                    <Grid item style={{marginLeft: 12}}>
                        <LoginButton/>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
