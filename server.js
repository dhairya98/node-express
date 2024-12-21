const express = require('express')
const app = express();
const db = require('./db')
const Person = require('./models/person')
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send('Hello World')
})

app.post('/person', async (req, res)=>{
 try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save()
    console.log('Data Saved');
    res.status(200).json(response);
 } catch(err) {
    console.log('error', err); 
    res.status(500).json({error: 'Internal Server Error'})
 }
})

app.get('/person', async (req, res)=> {
    try {
        const data = await Person.find();
        res.status(200).json(data);
    } catch (err) {
        console.log('error', err); 
    res.status(500).json({error: 'Internal Server Error'})
    }
})

app.listen(3000, ()=>{
    console.log('Server listening on port 3000');
})