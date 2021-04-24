import {retrieveQuestion} from "../api/v1/question/[question_id]";
import Error from "next/error";
import Question from "../../src/posts/Question";
import Post from "../../src/posts/Post";
import UserComment from "../../src/posts/UserComment";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React from "react";

export default function Page(props) {
    if (props.err) return <Error title={props.err.message} statusCode={props.err.status}/>
    let {question_data} = props;

    return (
        <Container maxWidth="md">
            <Box my={3}>
                <main>
                    <Question id={question_data.id} title={question_data.title}>
                        <Post id={"question-" + question_data.id} post_id={question_data.id} question_id={question_data.id} votes={question_data.votes}
                              content={question_data.content} author={question_data.author}>
                            {question_data.comments.map((comment, i) => (
                                <UserComment question_id={question_data.id} key={i} id={"comment-" + comment.id}
                                             author={comment.author}>{comment.content}</UserComment>
                            ))}
                        </Post>
                        {question_data.answers.map((answer, i) => (
                            <Post key={i} post_id={answer.id} id={"answer-" + answer.id} question_id={question_data.id} votes={answer.votes} content={answer.content}
                                  author={answer.author}>
                                {answer.comments.map((comment, j) => (
                                    <UserComment question_id={question_data.id} key={j} id={"comment-" + comment.id}
                                                 author={comment.author}>{comment.content}</UserComment>
                                ))}
                            </Post>
                        ))}
                    </Question>
                </main>
            </Box>
        </Container>
    )
}


export async function getServerSideProps(context) {
    const params = context.params;
    try {
        const question_data = await retrieveQuestion(params.question_id, true);
        return {
            props: {
                question_data: question_data
            }
        }
    } catch (e) {
        return {
            props: {
                err: JSON.parse(JSON.stringify(e))
            }
        }
    }
}
