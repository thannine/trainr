import React, { useState, useEffect } from 'react';
import { AgGridReact } from'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { compareAsc, format, parseISO } from 'date-fns'

export default function TrainingList() {

    const [trainings, setTrainings] = useState([]);
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

    
    const columns = [
        { field: "date", valueFormatter: dateFormatter, sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 200},
        { field: "duration", sortable: true, filter: true, cellStyle: {textAlign: "left"} },
        { field: "activity", sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 200 },
        { field: "customer", valueGetter: nameGetter, sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 150 },                 
    ];
    
    return (
        <div className="ag-theme-material" style={{height: '900px', width: '100%', margin: 'auto'}} >
            <AgGridReact
                columnDefs={columns} 
                rowData={trainings}>
            </AgGridReact>
        </div>
    );    

};
