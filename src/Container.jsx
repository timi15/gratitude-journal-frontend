import React from 'react'
import App from "./App";
import {Auth} from "./context/auth/Auth";
import {Post} from "./context/post/Post";
import {User} from "./context/user/User";
import {BrowserRouter as Router} from "react-router-dom";
import {SnackBar} from "./context/SnackBar";

export const Container = ({children}) => {
    return (
        <Router>
            <SnackBar>
                <Auth>
                    <User>
                        <Post>
                            <App>
                                {children}
                            </App>
                        </Post>
                    </User>
                </Auth>
            </SnackBar>
        </Router>

    )
}
