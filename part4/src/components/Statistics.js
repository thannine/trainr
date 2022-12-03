import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { groupBy, sumBy } from 'lodash';

export default function Statistics() {

    const [data, setData] = useState([]);
    useEffect(() => fetchData(), []);


    const fetchData = () => {
        const result = [];
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json()
        .then(data => {
            const grouped = groupBy(data, 'activity'); 
            for (const property in grouped) {
                let o = {};
                o.activity = property;
                o.duration = sumBy(grouped[property], 'duration');
                result.push(o);
              } 
              setData(result);               
        })
        .catch(err => console.log(err)));     
    }
       

    return (
        <div style={{height: '900px', width: '100%', margin: 'auto'}} >
            <BarChart width={900} height={900} data={data}>
                <XAxis dataKey="activity"  />
                <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
                <Bar dataKey="duration" barSize={50} fill="#8884d8"/>
            </BarChart>                      
        </div>
    );   

};