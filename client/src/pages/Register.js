import React, {useEffect, useRef, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";


//util
import makeStyles from "@material-ui/core/styles/makeStyles";
//redux
import {connect} from "react-redux";
import {signupUser} from "../redux/actions/userActions"
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    image: {
        backgroundImage: 'url(https://www.nouveau.co.uk/wp-content/uploads/2016/08/AdobeStock_258718314-1080x675.jpeg)',
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
        margin: theme.spacing(6, 4),
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
    text: {
        display: 'inline-block',
        marginTop: '10px'
    }
}))


const Register = (props) => {
    const {UI: {loading}} = props
    const classes = useStyles()

    const [form, setForm] = useState({
        email: '', password: '', confirmPassword: '', firstName: '',
        lastName: '', organization: ''
    })

    const [errors, setErrors] = useState({})


    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        console.log(props.UI.errors);
        setErrors(props.UI.errors)
    }, [props.UI.errors]);


    const handleSubmit = (event) => {
        event.preventDefault()

        const userData = {
            email: form.email,
            password: form.password,
            confirmPassword: form.confirmPassword,
            firstName: form.firstName,
            lastName: form.lastName,
            organization: form.organization
        }
        console.log(userData)
        props.signupUser(userData, props.history)
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
                        <LockOpenOutlinedIcon/>
                    </Avatar>
                    <Grid container className={classes.form}>
                        <Grid item sm>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                Sign up
                            </Typography>
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    id="firstName"
                                    name="firstName"
                                    type="firstName"
                                    label="FirstName"
                                    color="secondary"
                                    className={classes.textField}
                                    helperText={errors ? errors.firstName ? errors.firstName : null : null}
                                    error={errors ? errors.firstName ? true : false : false}
                                    value={form.firstName}
                                    onChange={changeHandler}
                                    fullWidth
                                    autoFocus
                                    required
                                />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    id="lastName"
                                    name="lastName"
                                    type="lastName"
                                    label="LastName"
                                    color="secondary"
                                    className={classes.textField}
                                    helperText={errors ? errors.lastName ? errors.lastName : null : null}
                                    error={errors ? errors.lastName ? true : false : false}
                                    value={form.lastName}
                                    onChange={changeHandler}
                                    fullWidth
                                    required
                                />
                                </Grid>
                                </Grid>
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
                                    required
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    id="organization"
                                    name="organization"
                                    type="organization"
                                    label="Organization"
                                    color="secondary"
                                    className={classes.textField}
                                    helperText={errors ? errors.organization ? errors.organization : null : null}
                                    error={errors ? errors.organization ? true : false : false}
                                    value={form.organization}
                                    onChange={changeHandler}
                                    fullWidth
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
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    label="Confirm Password"
                                    color="secondary"
                                    className={classes.textField}
                                    helperText={errors ? errors.confirmPassword ? errors.confirmPassword : null : null}
                                    error={errors ? errors.confirmPassword ? true : false : false}
                                    value={form.confirmPassword}
                                    onChange={changeHandler}
                                    fullWidth
                                    required
                                />
                                {errors && errors.general && (
                                    <Typography variant="body2" className={classes.customError}>
                                        {errors && errors.general}
                                    </Typography>
                                )}

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    disabled={loading}
                                    fullWidth
                                >
                                    Sign up
                                    {loading && (
                                        <CircularProgress size={30} className={classes.progress}/>
                                    )}
                                </Button>
                                <br/>
                                <small className={classes.text}>
                                    Already have an account ? Login <Link to="/login">here</Link>
                                </small>
                            </form>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>

    )
}

// Register.propTypes = {
//     user: PropTypes.object.isRequired,
//     UI: PropTypes.object.isRequired,
//     signupUser: PropTypes.func.isRequired
// }

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})


export default connect(mapStateToProps, {signupUser})((Register))
