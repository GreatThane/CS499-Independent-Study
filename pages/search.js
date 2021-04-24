import {useRouter} from "next/router";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {searchFor} from "./api/v1/search_for";
import {Button, ButtonBase, Grid, Paper} from "@material-ui/core";

export default function Search(props) {
    const router = useRouter();
    return (
        <Container maxWidth="md">
            <Box my={2}>
                <main>
                    <Grid container spacing={2}>
                        {props.results.map((result, i) => (
                            <Grid item xs={12} md={6} key={i}>
                                <Paper>
                                    <ButtonBase onClick={() => router.push(`/question/${result.id}`)}>
                                        <Box px={2} py={1}>
                                            <Grid container alignItems={"center"} spacing={3}>
                                                <Grid item>
                                                    <h2>{result.votes}</h2>
                                                </Grid>
                                                <Grid item>
                                                    <h3 style={{margin: 0, textAlign: "left"}}>{result.title}</h3>
                                                    <p style={{margin: 0, textAlign: "left"}}>{result.content.substring(0, 50)}</p>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </ButtonBase>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </main>
            </Box>
        </Container>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {results: await searchFor(context.query.search || "")}
    }
}
