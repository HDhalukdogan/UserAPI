import React from 'react'
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Typography,
    Stack,
    Modal,
    IconButton,
    InputAdornment,
    useMediaQuery
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AuthCardWrapper from '../authentication/AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import useScriptRef from 'hooks/useScriptRef';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import { Formik } from 'formik';
import agent from 'api/agent';
import SubCard from 'ui-component/cards/SubCard';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Profile() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const scriptedRef = useScriptRef()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const user = useSelector(state => state.account.user)
    let claims = user && JSON.parse(atob(user?.token.split('.')[1]));
    let roles = claims && claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>


            <MainCard>
                <Grid container>
                    <SubCard title="E-MAIL">
                        <Typography>{user?.email}</Typography>
                    </SubCard>
                    <SubCard title="ROLES">
                        <Typography></Typography>
                        {roles?.map(role => <Typography key={role}>{role}</Typography>)}
                    </SubCard>
                </Grid>
                <Grid>
                    <Button
                     onClick={handleOpen}
                     disableElevation
                     fullWidth
                     size="large"
                     variant="contained"
                     color="secondary"
                     >
                        Change Password
                     </Button>
                </Grid>

            </MainCard>






            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <AuthCardWrapper>
                                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                                        <Grid item sx={{ mb: 3 }}>
                                            <Link to="/">
                                                <Logo />
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid
                                                container
                                                direction={matchDownSM ? 'column-reverse' : 'row'}
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Grid item>
                                                    <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                        <Typography
                                                            color={theme.palette.secondary.main}
                                                            gutterBottom
                                                            variant={matchDownSM ? 'h3' : 'h2'}
                                                        >
                                                            CHANGE PASSWORD
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container direction="column" justifyContent="center" spacing={2}>
                                                <Grid item xs={12} container alignItems="center" justifyContent="center">
                                                    <Box sx={{ mb: 2 }}>
                                                        <Typography variant="subtitle1">Enter Password</Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            <Formik
                                                initialValues={{
                                                    currentPassword: 'Pa$$w0rd',
                                                    newPassword: 'Pa$$w0rd',
                                                    submit: null
                                                }}
                                                validationSchema={Yup.object().shape({
                                                    currentPassword: Yup.string().max(255).required('Current Password is required'),
                                                    newPassword: Yup.string().max(255).required('New Password is required')
                                                })}
                                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                                    try {
                                                        agent.Account.changePassword(values).then(() => navigate('/pages/login/login3')).catch(err => console.log('err', err))
                                                        setSubmitting(true)
                                                        if (scriptedRef.current) {
                                                            setStatus({ success: true });
                                                            setSubmitting(false);
                                                        }
                                                    } catch (err) {
                                                        console.error(err);
                                                        if (scriptedRef.current) {
                                                            setStatus({ success: false });
                                                            setErrors({ submit: err.message });
                                                            setSubmitting(false);
                                                        }
                                                    }
                                                }}
                                            >
                                                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                                    <form noValidate onSubmit={handleSubmit}>
                                                        <FormControl
                                                            fullWidth
                                                            error={Boolean(touched.currentPassword && errors.currentPassword)}
                                                            sx={{ ...theme.typography.customInput }}
                                                        >
                                                            <InputLabel htmlFor="outlined-adornment-currentPassword">Current Password</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-currentPassword"
                                                                type={showPassword ? 'text' : 'password'}
                                                                value={values.currentPassword}
                                                                name="currentPassword"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={handleClickShowPassword}
                                                                            onMouseDown={handleMouseDownPassword}
                                                                            edge="end"
                                                                            size="large"
                                                                        >
                                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                                label="currentPassword"
                                                                inputProps={{}}
                                                            />
                                                            {touched.password && errors.password && (
                                                                <FormHelperText error id="standard-weight-helper-text-currentPassword">
                                                                    {errors.password}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>


                                                        <FormControl
                                                            fullWidth
                                                            error={Boolean(touched.newPassword && errors.newPassword)}
                                                            sx={{ ...theme.typography.customInput }}
                                                        >
                                                            <InputLabel htmlFor="outlined-adornment-newPassword">New Password</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-newPassword"
                                                                type={showPassword ? 'text' : 'password'}
                                                                value={values.newPassword}
                                                                name="newPassword"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={handleClickShowPassword}
                                                                            onMouseDown={handleMouseDownPassword}
                                                                            edge="end"
                                                                            size="large"
                                                                        >
                                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                                label="currentPassword"
                                                                inputProps={{}}
                                                            />
                                                            {touched.password && errors.password && (
                                                                <FormHelperText error id="standard-weight-helper-text-newPassword">
                                                                    {errors.password}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>

                                                        <Box sx={{ mt: 2 }}>
                                                            <AnimateButton>
                                                                <Button
                                                                    disableElevation
                                                                    disabled={isSubmitting}
                                                                    fullWidth
                                                                    size="large"
                                                                    type="submit"
                                                                    variant="contained"
                                                                    color="secondary"
                                                                >
                                                                    Change Password
                                                                </Button>
                                                            </AnimateButton>
                                                        </Box>
                                                        <Box sx={{ mt: 2 }}>
                                                            <AnimateButton>
                                                                <Button
                                                                    disableElevation
                                                                    disabled={isSubmitting}
                                                                    fullWidth
                                                                    size="large"
                                                                    type="button"
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={handleClose}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </AnimateButton>
                                                        </Box>
                                                    </form>
                                                )}
                                            </Formik>
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                        <AuthFooter />
                    </Grid>
                </Grid>
            </Modal>
        </div>
    )
}
export default Profile;