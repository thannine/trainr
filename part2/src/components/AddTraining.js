import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function AddTraining(props) {

    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState(
        {
            date: new Date(), duration: '', activity: '', customer: ''
        }
    );

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});    
    };

    const addTraining = () => {
        let customer = props.customer;
        training.customer = customer.links[0].href;
        props.saveTraining(training);
        handleClose();
    };   
 
    return (
        <div>
            <Button size="small" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker 
                            renderInput={(params) => <TextField {...params} />}
                            value={training.date}
                            disablePast={true}
                            inputFormat="dd-MM-yyyy HH:mm"
                            onChange={(newValue) => {
                                setTraining({...training, ['date']: newValue});}}
                        >  
                        </DateTimePicker>
                    </LocalizationProvider> 
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={event => handleInputChange(event)}
                        label="Duration"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />                                                                                                                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );    
    
};