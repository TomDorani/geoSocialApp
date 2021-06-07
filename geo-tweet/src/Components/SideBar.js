// import React, { useState } from "react";
// import Drawer from "@material-ui/core/Drawer";
// import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
// import { makeStyles, useTheme } from "@material-ui/core/styles";




// const SideBar = (state) => {

//     const [open, setOpen] = useState(false);
//     const classes = useStyles();
//     const useStyles = makeStyles((theme) => ({
//         paper: {
//             position: "absolute",
//             width: 1100,
//             backgroundColor: theme.palette.background.paper,
//             border: "2px solid #000",
//             boxShadow: theme.shadows[5],
//             padding: theme.spacing(3, 4, 3),
//         },
//         headline: {
//             alignSelf: "center",
//         },
//     }));
//     const handleDrawerClose = () => {
// 		setOpen(false);
// 		state.search ="";

// 	};
// 	const handleChange = (event) => {
// 		setState({ ...state, [event.target.name]: event.target.checked });
// 	};

// 	const searchChange = (event) => {
// 		state.search = event.target.value;
// 	};




//     return(
//         <Drawer
//                     BackdropProps={{ invisible: true }}
//                     anchor="left"
//                     open={open}
//                     classes={{
//                         paper: classes.drawerPaper,
//                     }}
//                 >
//                     <div className="DrawerHeader">
//                         <Typography
//                             variant="h6"
//                             noWrap
//                             style={{ padding: "20px", marginInlineEnd: "35%" }}
//                         >
//                             Geo Tweet
//                         </Typography>
//                         <div className="DrawerButton">
//                             <IconButton onClick={handleDrawerClose} style={{ color: "white" }}>
//                                 {theme.direction === "ltr" ? (
//                                     <ChevronLeftIcon />
//                                 ) : (
//                                     <ChevronRightIcon />
//                                 )}
//                             </IconButton>
//                         </div>
//                     </div>
//                     <Divider />
//                     <List>
//                         <Container maxWidth="sm">
//                             <Grid
//                                 className="layer"
//                                 container
//                                 direction="column"
//                                 justify="center"
//                                 alignItems="flex-start"
//                             >
//                                 <Grid>
//                                     <TextField
//                                         id="standard-basic"
//                                         label="KeyWords"
//                                         onChange={(e) => {
//                                             searchChange(e);
//                                         }}
//                                     />
//                                     <Button
//                                         className="searchbtn"
//                                         variant="contained"
//                                         color="primary"
//                                         onClick={(e) => {
//                                             checkSearch(e);
//                                         }}
//                                     >
//                                         Search
//                                     </Button>
//                                 </Grid>
//                                 <FormGroup className="switch">
//                                     <FormControlLabel
//                                         className="heatMapSwitch"
//                                         control={
//                                             <Switch
//                                                 checked={state.heatMap}
//                                                 onChange={handleChange}
//                                                 name="heatMap"
//                                                 color="primary"
//                                             />
//                                         }
//                                         label="Heatmap Layer"
//                                     />
//                                     <FormControlLabel
//                                         className="SentiSwitch"
//                                         control={<SentiFilter senti={senti} sentiChange={setSenti} />}
//                                         // label="Heatmap Layer"
//                                     />
//                                 </FormGroup>
//                             </Grid>
//                         </Container>
//                     </List>
//                     <Divider />
//                     <List>
//                         <Accordion search={search}></Accordion>
//                         <ListItem button key={"Contact Us"} onClick={contactUsOpen}>
//                             <ListItemIcon>
//                                 <MailIcon />
//                             </ListItemIcon>
//                             <ListItemText primary={"Contact Us"} />
//                         </ListItem>
//                     </List>
//         </Drawer>
//     )}


// export default SideBar;
