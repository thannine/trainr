import React, { useState, useEffect } from 'react';
import { AgGridReact } from'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function CustomerList() {

    const [customers, setCustomers] = useState([]);
    useEffect(() => fetchCustomers(), []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.log(err));
    };
    
    const columns = [
        { field: "firstname", sortable: true, filter: true, cellStyle: {textAlign: "left"}},
        { field: "lastname", sortable: true, filter: true, cellStyle: {textAlign: "left"} },
        { field: "streetaddress", sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 200 },
        { field: "postcode", sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 200 },
        { field: "city", sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 200 },
        { field: "email", sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 200 },
        { field: "phone", sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 200 },                 
    ];
    
    return (
        <div className="ag-theme-material" style={{height: '900px', width: '100%', margin: 'auto'}} >
            <AgGridReact
                columnDefs={columns} 
                rowData={customers}>
            </AgGridReact>
        </div>
    );    

};