import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Switch, Route } from 'react-router-dom';
import routes from '../../../../../app/routes';
import PersonIcon from '@material-ui/icons/Person';
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentInd from '@material-ui/icons/AssignmentInd';

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import history from '../../../../../app/history';
import { useAppContext } from '../../../../../app/contexts/useAppContext';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MiniDrawer() {
    const { state: { auth }, dispatch } = useAppContext();

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <Route
                        path={prop.layout + prop.subLayout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };


    const onLogout = () => {
        localStorage.clear()
        history.push('/auth/login')
    }

    const onDashBoard = () => {
        history.push('/admin/dashboard')

    }

    const onStudent = () => {
        history.push('/admin/applicants')

    }

    const onPosition = () => {
        history.push('/admin/positions')

    }

    const onUserList = () => {
        history.push('/admin/users')

    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className='bg-primary'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <h6 className='text-light m-0 font-weight-bold'>
                        HRIS Applicants
                    </h6>

                </Toolbar>

            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />

                <List>
                    {['Dashboard'].map((text, index) => (
                        <ListItem onClick={() => { onDashBoard() }} button key={text}>
                            <ListItemIcon> <DashboardIcon />  </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <List>
                    {['Applicants'].map((text, index) => (
                        <ListItem onClick={() => { onStudent() }} button key={text}>
                            <ListItemIcon> <PersonIcon />  </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>

                <List>
                    {['Position'].map((text, index) => (
                        <ListItem onClick={() => { onPosition() }} button key={text}>
                            <ListItemIcon> <DescriptionIcon />  </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>

                <List>
                    {['User'].map((text, index) => (
                        <ListItem onClick={() => { onUserList() }} button key={text}>
                            <ListItemIcon> <AssignmentInd />  </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>




                <Divider />
                {localStorage.UserType === 'A' ?

                    <List>
                        {['User List'].map((text, index) => (
                            <ListItem onClick={() => { onUserList() }} button key={text}>
                                <ListItemIcon ><SupervisorAccountIcon /></ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    :
                    ""

                }

                <List>
                    {['Logout'].map((text, index) => (
                        <ListItem onClick={() => { onLogout() }} button key={text}>
                            <ListItemIcon ><MeetingRoomIcon /></ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>



            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {<Switch>{getRoutes(routes)}</Switch>}
            </main>
        </div>
    );
}