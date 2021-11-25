import React, {useEffect, useRef, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";



//util
import makeStyles from "@material-ui/core/styles/makeStyles";
//redux
import {connect} from "react-redux";
import {loginUser} from "../redux/actions/userActions"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    image: {
        backgroundImage: 'url(https://wallpaperaccess.com/full/2655666.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    form: {
        textAlign: 'center',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        marginTop: theme.spacing(1)

    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    textField: {
        color: '#000'
    },

    button: {
        backgroundColor: theme.palette.secondary.main,
        marginTop: '20px'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    rememberMe: {
        display: 'flex',
        alignItems: 'left'
    },
    text: {
        display: 'inline-block',
        marginTop: '10px'
    }
}))


const Login = (props) => {
    const {UI: {loading}} = props
    const [errors, setErrors] = useState({})
    const classes = useStyles()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        console.log(props.UI.errors)
        setErrors(props.UI.errors)
    }, [props.UI.errors]);

    const handleSubmit = (event) => {
        event.preventDefault()

        const userData = {
            email: form.email,
            password: form.password
        }
        props.loginUser(userData, props.history)
    }
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={false} md={7} className={classes.image}/>
            <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <VpnKeyOutlinedIcon/>
                    </Avatar>
                    <Grid container className={classes.form}>
                        <Grid item sm>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                Sign in
                            </Typography>
                            <form noValidate onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    color="secondary"
                                    className={classes.textField}
                                    helperText={errors ? errors.email ? errors.email : null : null}
                                    error={errors ? errors.email ? true : false : false}
                                    value={form.email}
                                    onChange={changeHandler}
                                    fullWidth
                                    autoFocus
                                    required
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    color="secondary"
                                    className={classes.textField}
                                    helperText={errors ? errors.password ? errors.password : null : null}
                                    error={errors ? errors.password ? true : false : false}
                                    value={form.password}
                                    onChange={changeHandler}
                                    fullWidth
                                    required
                                />
                                {errors && errors.general && (
                                    <Typography variant="body2" className={classes.customError}>
                                        {errors && errors.general}
                                    </Typography>
                                )}

                                <FormControlLabel
                                    control={<Checkbox value="remember" color="secondary"/>}
                                    className={classes.rememberMe}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    disabled={loading}
                                    fullWidth
                                >
                                    Sign in
                                    {loading && (
                                        <CircularProgress size={30} className={classes.progress}/>
                                    )}
                                </Button>
                                <br/>
                                <small className={classes.text}>
                                    don't have an account ? sign up
                                    <Link to="/register"> here</Link>
                                </small>
                            </form>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>

    )
}

// Login.propTypes = {
//     user: PropTypes.object.isRequired,
//     UI: PropTypes.object.isRequired,
//     loginUser: PropTypes.func.isRequired
// }

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})


export default connect(mapStateToProps, {loginUser})(Login)
