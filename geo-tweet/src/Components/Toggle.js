import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MoodIcon from '@material-ui/icons/Mood';
import '../CSS/Drawer.css'
import Typography from '@material-ui/core/Typography';
import AdjustIcon from '@material-ui/icons/Adjust';



export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      
      
    >

      <ToggleButton value="Adjust" aria-label="Adjust" >
        <AdjustIcon  style = {{paddingRight: "10px"}}/>
        <Typography className="toggleText">Standard View</Typography>
         
      </ToggleButton>
      <ToggleButton value="Mood" aria-label="Mood">
      <Typography className="toggleText">Santimental View</Typography>
        <MoodIcon className = "MoodIcon"/>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
