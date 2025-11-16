import React, {useState, useEffect, useContext} from "react";
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import {UserContext} from "../context/user/User";
import "../asserts/css/modal.css"
import "../asserts/css/login.css"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "darkslategray",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
    height: '70vh'
};

export const EditUserModal = ({open, handleClose, editingUser}) => {

    const {handleChangeUser} = useContext(UserContext);

    const [formData, setFormData] = useState({
        role: ""
    });

    useEffect(() => {
        if (editingUser) {
            setFormData(editingUser);
        }
    }, [editingUser]);

    const handleSave = () => {
        handleChangeUser(editingUser.id, formData)
    }


    return (
        <Modal open={open} onClose={handleClose}>
            <Box className="form" sx={style}>
                <Typography variant="h4" mb={2}>
                    Edit User
                </Typography>

                <TextField
                    disabled
                    fullWidth
                    margin="dense"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={({target}) =>
                        setFormData({...formData, [target.name]: target.value})
                    }
                />

                <TextField
                    disabled
                    fullWidth
                    margin="dense"
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={({target}) =>
                        setFormData({...formData, [target.name]: target.value})
                    }
                />

                <TextField
                    disabled
                    fullWidth
                    margin="dense"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={({target}) =>
                        setFormData({...formData, [target.name]: target.value})
                    }
                />

                <FormControl fullWidth margin="dense">
                    <InputLabel>Role</InputLabel>
                    <Select
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={({target}) =>
                            setFormData({...formData, [target.name]: target.value})
                        }
                    >
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                        <MenuItem value="USER">USER</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{mt: 2}}
                    onClick={handleSave}
                >
                    Save
                </Button>

            </Box>
        </Modal>
    );
};
