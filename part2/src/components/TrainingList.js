import React, { useState, useEffect } from 'react';
import { AgGridReact } from'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { format, parseISO } from 'date-fns'

export default function TrainingList() {

    const deleteCellRenderer = props => <Button color="error" size="small" onClick={() => deleteTraining(trainings[props.value])}>Delete</Button>;

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    useEffect(() => fetchTrainings(), []);
    
    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json()
        .then(data => setTrainings(data))
        .catch(err => console.log(err)));

    };

    const nameGetter = (params) => {
       if (params.data.customer) {
        return params.data.customer.firstname + " " + params.data.customer.lastname;
       }    
    };

    const dateFormatter = (params) => {
        if (params.data.date) {
            return format(parseISO(params.data.date), 'dd-MM-yyyy HH:mm');
        }
    };

    const deleteTraining = (training) => {
        let url = 'https://customerrest.herokuapp.com/api/trainings/' + training.id;
        if (window.confirm("The training will be deleted! Are you sure?")) {
            fetch(url, {method: 'DELETE'})
            .then(response => {
                fetchTrainings();
                setMessage('Training deleted');
                setOpen(true)               
            })
            .catch(err => console.log(err));
        }
    };

    
    const columns = [
        { field: "date", valueFormatter: dateFormatter, sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 200},
        { field: "duration", sortable: true, filter: true, cellStyle: {textAlign: "left"} },
        { field: "activity", sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 200 },
        { field: "customer", valueGetter: nameGetter, sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 150 },
        { valueGetter: 'node.id', headerName: "", width: 100, cellStyle: {textAlign: "left"},
        cellRenderer: deleteCellRenderer}                
    ];
    
    return (
        <div className="ag-theme-material" style={{height: '900px', width: '100%', margin: 'auto'}} >
            <AgGridReact
                columnDefs={columns} 
                rowData={trainings}>
            </AgGridReact>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={(event, reason) => {setOpen(false)}}
                message={message}
                severity="success"
            />            
        </div>
    );    

};
