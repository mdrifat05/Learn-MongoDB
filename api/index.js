const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bdj', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// const mongoose = require('mongoose');

// const connectionStr = 'mongodb://bipul:bipul@172.16.4.160:27017/?authMechanism=SCRAM-SHA-1';
// const dbName = 'bdj';

// mongoose.connect(connectionStr, {
//     dbName: dbName,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log(`Connected to database: ${dbName}`);
// })
// .catch(err => {
//     console.error(`Error connecting to database: ${err}`);
// });


// Define the schema and model directly
const JobSchema = new mongoose.Schema({
    Jpid: Number,
    cpid: Number,
    applyid: Number,
    title: String,
    date: Date,
}, {
    versionKey: false, // Exclude the version key from the documents
});
const NewJobs = mongoose.model('job_inbox', JobSchema, 'job_inbox');

// Middleware for parsing JSON
app.use(express.json());
//================================== insert ==================
// API endpoint to insert a new job
app.post('/insert', async(req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



//================================== update ==================
app.put('/update/:id', async(req, res) => {
    try {} catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




//================================== Delete ==================
app.delete('/delete/:id', async(req, res) => {
    try {

    } catch (error) {
        res.status(401).json(error)
    }
});



//======================== find data =================
// Define the aggregation pipeline

// GET endpoint to retrieve job data by Jpid
app.get('/jobs/:Jpid/:cpid', async(req, res) => {
    try {

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});












// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
