import React, { useState, useEffect } from 'react';
import { AgGridReact } from'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

export default function CustomerList() {

    const deleteCellRenderer = props => <Button color="error" size="small" onClick={() => deleteCustomer(customers[props.value])}>Delete</Button>;
    const editCellRenderer = props =>  <EditCustomer updateCustomer={updateCustomer} customer={customers[props.value]}/>  
    const addCellRenderer = props =>  <AddTraining saveTraining={saveTraining} customer={customers[props.value]}/> 

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    useEffect(() => fetchCustomers(), []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.log(err));
    };

    const deleteCustomer = (customer) => {
        if (window.confirm("The customer will be deleted! Are you sure?")) {
            fetch(customer.links[0].href, {method: 'DELETE'})
            .then(response => {
                fetchCustomers();
                setMessage('Customer deleted');
                setOpen(true)               
            })
            .catch(err => console.log(err));
        }
    };   

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', 
        {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)})
        .then(response => {
            fetchCustomers();
            setMessage('Customer added');
            setOpen(true)
        })
        .catch(err => console.log(err));
    };
    
    const updateCustomer = (customer, link) => {
        fetch(link, 
        {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)})
        .then(response => {
            fetchCustomers();
            setMessage('Customer updated');
            setOpen(true) ;           
        })
        .catch(err => console.log(err));
    };  
    
    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', 
            {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(training)})
            .then(response => {
                setMessage('Training added');
                setOpen(true);   
            })
            .catch(err => console.log(err));
    };
    
    const columns = [
        { field: "firstname", sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 150 },
        { field: "lastname", sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 150  },
        { field: "streetaddress", sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 200 },
        { field: "postcode", sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 150 },
        { field: "city", sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 150 },
        { field: "email", sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 200 },
        { field: "phone", sortable: true, filter: true, cellStyle: {textAlign: "left"}, maxWidth: 150 },
        { valueGetter: 'node.id', headerName: "", width: 100, cellStyle: {textAlign: "left"},
            cellRenderer: editCellRenderer},        
        { valueGetter: 'node.id', headerName: "", width: 100, cellStyle: {textAlign: "left"},
            cellRenderer: deleteCellRenderer},
        { valueGetter: 'node.id', headerName: "", width: 100, cellStyle: {textAlign: "left"},
            cellRenderer: addCellRenderer, width: 200},                               
    ];
    
    
    return (
        <div className="ag-theme-material" style={{height: '900px', width: '100%', margin: 'auto'}} >
            <AddCustomer saveCustomer={saveCustomer} />
            <AgGridReact
                columnDefs={columns} 
                rowData={customers}>
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