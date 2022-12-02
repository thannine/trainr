import React, { useState, useEffect } from 'react';
import { AgGridReact } from'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import {format, parse, parseISO, startOfWeek, getDay, addMinutes } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import enUS from 'date-fns/locale/en-US'

export default function TrainingList(props) {

    const locales = {
        'en-US': enUS
    };

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    });

    const deleteCellRenderer = props => <Button color="error" size="small" onClick={() => deleteTraining(trainings[props.value])}>Delete</Button>;

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [events, setEvents] = useState([]);
    useEffect(() => fetchTrainings(), []);
    
    const fetchTrainings = () => {
        let trainingEvents = [];
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json()
        .then(data => {
            setTrainings(data);
            data.forEach((element, index) => {
                if (element.activity && element.date && element.duration) {
                    let e = {};
                    e.title = element.activity;
                    let date = parseISO(element.date);
                    e.start = date;
                    let end = addMinutes(date, element.duration);
                    e.end = end;
                    trainingEvents.push(e);
                }
            });
            setEvents(trainingEvents);
        })
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
    
    if (props.calendar) {
        return (
            <div className="ag-theme-material" style={{height: '900px', width: '100%', margin: 'auto'}} >
                <Calendar
                    events={events}
                    localizer={localizer}
                    views={['month', 'week', 'day']}
                    defaultDate={new Date()}
                    style={{ height: 900 }}
                />
            </div>
        );
    } else {
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
    );}    
};
