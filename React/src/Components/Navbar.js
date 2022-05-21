import React from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    navLinks: {
        marginLeft: theme.spacing(5),
        display: "flex",
    },
    logo: {
        fontSize:"20px",
        cursor: "pointer",
        fontWeight:"bold",
        display:"block"
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(10),
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },

    login:{

    }
}));

function Navbar() {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                    Instructor System Management
                </Typography>
                <div className={classes.navLinks}>
                    <Link to="/" className={classes.link}>
                        Instructors
                    </Link>
                    <Link to="/courses" className={classes.link}>
                        Courses
                    </Link>
                    <Link to="/login" className={`${classes.link} ${classes.login}`}>
                        Login
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;