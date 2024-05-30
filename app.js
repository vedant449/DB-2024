const express = require('express');
const mysql = require('mysql');
const pool = require('./db');

const app = express();

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'iot_database' 
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log('Connected to MySQL');
});

app.get('/send-data', (req, res) => {
    const data = [
        {
            device_id: 'iot_device_1',
            temperature: Math.random() * 100, 
            humidity: Math.random() * 100 
        },
        {
            device_id: 'iot_device_2',
            temperature: Math.random() * 100, 
            humidity: Math.random() * 100
        },
        {
            device_id: 'iot_device_3',
            temperature: Math.random() * 100, 
            humidity: Math.random() * 100
        }
    ];

    data.forEach(device => {
        const query = 'INSERT INTO iot_data (device_id, temperature, humidity) VALUES (?, ?, ?)';
        connection.query(query, [device.device_id, device.temperature, device.humidity], (err, result) => {
            if (err) {
                console.error('Error saving data to MySQL:', err);
            } else {
                console.log('Data saved to MySQL for device:', device.device_id);
            }
        });
    });

    res.send('Data sent and saved successfully');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
