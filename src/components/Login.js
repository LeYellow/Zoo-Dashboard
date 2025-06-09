import React, { useState, useContext } from 'react';
import "./Login.css";
import { Dialog, DialogContent, DialogActions, Button, TextField, DialogTitle, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import AuthContext from '../context/AuthProvider';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

function Login () {
    const { setAuth } = useContext(AuthContext);
    const [openMenu, setOpenMenu] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loginSucces, setLoginSucces] = useState('');
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleShowMenu = () => setOpenMenu((openMenu) => !openMenu);
    const [userData, setUserData] = useState({
        Username: '',
        Password: '',
    });

    const handleUserLogin = async (event) => {
        event.preventDefault();
        //console.log(userData);  //debug

        try {
            const response = await axios.post("http://localhost/ZooDashboard/zoo_dashboard/src/backend/userLogin.php", userData);
            console.log(response.data);   //debug
            setLoginError('');
            setLoginSucces("Login succesful, please wait");
            setTimeout(() => {
                setAuth(userData);
                handleShowMenu();
            }, 1500);
        }
        catch(error) {
            if(error.response && error.response.status === 401) {
                setLoginError("Invalid username or password");
            } else {
                setLoginError ("An unexpected error occured, Try again later");
            }
            console.error("Login error: ", error);
        }
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleLoginClick = () => {
        setUserData({
            Username: '',
            Password: ''
        });
        setLoginSucces('');
        setLoginError('');
        handleShowMenu();
    };

    return (
        <div>
            <h6 onClick={handleLoginClick} className="login-btn">
                Zookeeper mode
            </h6>
            
            <Dialog open={openMenu} onClose={handleShowMenu}>
                <form onSubmit={handleUserLogin}>
                    <DialogTitle>Zookeeper Login</DialogTitle>
                    <DialogContent sx={{ width: 300 }}>
                        <TextField label="Name" name="Username" margin="normal" fullWidth onChange={handleChange} value={userData.Username} autoComplete="off" required/>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="pass">Password</InputLabel>
                            <OutlinedInput id="pass" label="Password" name="Password" type={showPassword ? 'text' : 'password'} onChange={handleChange} value={userData.Password} autoComplete="off" required
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                        {loginError ? (
                            <p style={{ color: 'red', marginTop: 3}}>{loginError}</p>
                        ) : (
                            <p style={{ color: 'green', marginTop: 3}}>{loginSucces}</p>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleShowMenu} sx={{backgroundColor: 'red', color: 'white', '&:hover': {backgroundColor: 'darkred'}}}>Close</Button>
                        <Button type="submit" sx={{ backgroundColor: 'green', color: "white", '&:hover': {backgroundColor: 'darkgreen'}}}>Log In</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default Login;