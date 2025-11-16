import React, {useContext, useState} from "react";
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
import {UserContext} from "../context/user/User";
import {EditUserModal} from "./EditUserModal";
import {AuthContext} from "../context/auth/Auth";
import "../asserts/css/table.css"

export const UsersTable = () => {

    const {users, handleRemoveUser} = useContext(UserContext);
    const {username} = useContext(AuthContext);

    const [editingUser, setEditingUser] = useState(null);
    const [open, setOpen] = useState(false);

    const handleEdit = (user) => {
        setEditingUser(user);
        setOpen(true);
    };

    const columns = [
        {id: "name", label: "Name", minWidth: 100},
        {id: "username", label: "Username", minWidth: 80},
        {id: "email", label: "Email", minWidth: 80},
        {id: "role", label: "Role", minWidth: 80},
        {id: "actions", label: "", minWidth: 120, align: "center"}
    ];

    return (
        <Paper sx={{width: '100%', overflow: 'hidden', marginTop: '5rem'}}>
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
                        {users
                            .map((user, index) => (
                                <TableRow hover key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>

                                    <TableCell align="center">
                                        {(index !== 0 && user.username !== username) && (
                                            <>
                                                <IconButton
                                                    style={{marginRight: "20px"}}
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    <EditIcon/>
                                                </IconButton>

                                                <IconButton
                                                    onClick={() => handleRemoveUser(user.id)}
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>

                </Table>
            </TableContainer>

            <EditUserModal
                open={open}
                handleClose={() => setOpen(false)}
                editingUser={editingUser}
            />

        </Paper>
    );
};
