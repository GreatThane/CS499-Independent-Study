import {AppBar, ButtonBase, Grid, Hidden, Toolbar} from "@material-ui/core";
import {useState} from "react";
import SearchBar from "material-ui-search-bar";
import LoginButton from "./LoginButton";
import {useRouter} from "next/router";
import HomeIcon from '@material-ui/icons/Home';
import Box from "@material-ui/core/Box";


export default function Header() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container justify="space-between" alignItems="center" wrap="nowrap">

                    <ButtonBase onClick={() => router.push('/')}>
                        <Grid item container alignItems={"center"}>
                            <Grid item>
                                <Box pr={1}>
                                <HomeIcon fontSize={"large"}/>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Hidden smDown>
                                    <h3>Stack Underflow</h3>
                                </Hidden>
                            </Grid>
                        </Grid>
                    </ButtonBase>
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
