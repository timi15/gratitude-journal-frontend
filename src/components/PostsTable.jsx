import React, {useContext} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {PostContext} from "../context/post/Post";


export const PostsTable = ({onEdit}) => {

    const {posts, handleRemovePost} = useContext(PostContext);

    const columns = [
        {id: "date", label: "Date", minWidth: 100},
        {id: "mood", label: "Mood", minWidth: 80},
        {id: "dailyHighlight", label: "Daily highlight", minWidth: 80},
        {id: "dailyLesson", label: "Daily lesson", minWidth: 80},
        {id: "content", label: "Content", minWidth: 200},
        {id: "actions", label: "", minWidth: 120, align: "center"}
    ];


    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table sx={{whiteSpace: "normal", wordBreak: "break-word"}}>


                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        fontWeight: "bold",
                                        fontSize: "large",
                                        color: "whitesmoke"
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {posts
                            .map((post) => (
                                <TableRow hover key={post.id}>
                                    <TableCell>{post.date}</TableCell>
                                    <TableCell>{post.mood}</TableCell>
                                    <TableCell sx={{
                                        whiteSpace: "normal",
                                        wordBreak: "break-word",
                                        maxWidth: 250
                                    }}>{post.dailyHighlight}</TableCell>
                                    <TableCell sx={{
                                        whiteSpace: "normal",
                                        wordBreak: "break-word",
                                        maxWidth: 250
                                    }}>{post.dailyLesson}</TableCell>
                                    <TableCell sx={{
                                        whiteSpace: "normal",
                                        wordBreak: "break-word",
                                        maxWidth: 250
                                    }}>{post.content}</TableCell>


                                    <TableCell align="center">
                                        <IconButton
                                            style={{marginRight: "20px"}}
                                            color="primary"
                                            onClick={() => onEdit(post)}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() => handleRemovePost(post.id)}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>

                </Table>
            </TableContainer>

        </Paper>
    );
};
