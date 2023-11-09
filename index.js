import express from 'express'
import cors from 'cors'
import router from './Routers/hallBooking.Router.js';

const app = express();
const PORT = 4000;

//midileware
app.use(cors());
app.use(express.json());

//api routers

app.use('/api/hall',router)


// listen

app.listen(PORT, ()=>{

    console.log('The backend app is listening with PORT', PORT);
})