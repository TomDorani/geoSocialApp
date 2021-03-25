
import React,{useState,useEffect ,useRef} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ToggleButtons from "./Toggle"
import '../CSS/Drawer.css'
import {Map} from "./Map"
import { Marker } from 'react-leaflet';
import Modal from '@material-ui/core/Modal';
import BasicTable from './Table'




const drawerWidth = "50vmin";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  
}));



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function PersistentDrawerLeft() {
const [state, setState] = useState({
  checkedA: true,
  checkedB: true,
});

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  
  const [contactUsIsOpen, setContactUsIsOpen] = useState(false);


  const handleModalOpen = () => {

    setModalIsOpen(true);
    console.log("open")
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const contactUsOpen = () => {
    console.log("Contact Us")
    setContactUsIsOpen(true)

  };

  const contactUsClose = () => {
    console.log("Contact Us")
    setContactUsIsOpen(false)

  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 1100,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3, 4, 3),
    },
  }));

  const classes = useStyles();


  const body = (
    <div style={modalStyle} className={classes.paper} >
      <h2 id="simple-modal-title">Statistics</h2>
      <BasicTable/>
    </div>
  );

  const contactUsBody = (
    <div style={modalStyle} className={classes.paper} >
      <h2 id="contact-us-title">Contact Us</h2>
       <TextField id="outlined-basic" label="Subject" />
      <h4 id="contact-us-text-title">Please provide a brief description of your issue.</h4>

      <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          lable="Brief Description"
          variant="outlined"

          
        />

    </div>
  );
  

 


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  

  const  m = [
        {
        lat: 51.505,
        lng: -0.09,
        zoom: 1,
        zoomOffset: 1
        },
        {
            lat: 20.505,
            lng: -0.09,
            zoom: 1,
            zoomOffset: 1
            },
        ]

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Geo Tweet
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <Container maxWidth="sm">
            <Grid
                className = "layer"
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
            >

        <TextField id="standard-basic" label="KeyWords" />
        <FormGroup row >   
            <FormControlLabel
                control={
                <Switch 
                checked={state.checkedA} 
                onChange={handleChange} 
                name ="checkedA" />}
                label="Cluster Layer" color = "primary"
            />
            <FormControlLabel
                control={
                <Switch 
                checked={state.checkedB}
                onChange={handleChange}
                name="checkedB"
                color="primary"
            />
            }
                label="Heatmap Layer"
            />
        </FormGroup>   
        </Grid>

            <FormControl component="fieldset">
              <FormLabel component="legend">View</FormLabel>
              <br></br>
              <div className = "gap">
                 <ToggleButtons></ToggleButtons>
              </div>
            </FormControl>

        </Container>
        </List>
        <Divider />
        <List>
          <ListItem button key = {'Show Statistics'} onClick = {handleModalOpen}>
          <ListItemIcon><EqualizerIcon /></ListItemIcon>
          <ListItemText primary={'Show Statistics'} />
          </ListItem>
          <ListItem button key = {'Contact Us'} onClick = {contactUsOpen}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary={'Contact Us'} />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Map/>
        
      </main>
      
      <Modal  id = "modal" open={modalIsOpen} onClose ={handleModalClose}
          // aria-labelledby="simple-modal-title"
          // aria-describedby="simple-modal-description"
  
        >
        {body}
      </Modal>

      <Modal  id = "contactUsModal" open={contactUsIsOpen} onClose ={contactUsClose}
          // aria-labelledby="simple-modal-title"
          // aria-describedby="simple-modal-description"
  
        >
        {contactUsBody}
      </Modal>

    </div>
  );
}
