import express from 'express'
import cors from 'cors'
import router from './Routers/hallBooking.Router.js';

const app = express();
const PORT = 4000;

//midileware
app.use(cors());
app.use(express.json());

//api routers
app.get('/', (req, res) => {
  const welcomeMessage = 'Welcome to the Hall Booking API';
  const apiLinks = `
    <ul>
      <li><a href="/api/hall/rooms">Get Room Details</a></li>
      <li><a href="/api/hall/create/room">Create Room</a></li>
      <li><a href="/api/hall/booking">Book a Room</a></li>
      <li><a href="/api/hall/rooms/alldata">List All Data with Booking Status</a></li>
      <li><a href="/api/hall/customers/alldata">List Customers with All Data</a></li>
      <li><a href="/api/hall/count/alldata">Booking Count</a></li>
    </ul>
    <div>
  <h1>Please use blelow API's</h1>
  <p>Get room details - https://hall-booking-n72k.onrender.com/api/hall/rooms</p>
  <p>create Room      - https://hall-booking-n72k.onrender.com/api/hall/create/room</p>
  <p>Booking Room     - https://hall-booking-n72k.onrender.com/api/hall/booking</p>
  <p>ListAllDataWithbookingStatus- https://hall-booking-n72k.onrender.com/api/hall/rooms/alldata</p>
  <p>ListCustomerswithallData-https://hall-booking-n72k.onrender.com/api/hall/customers/alldata</p>
  <p>BookingCount- https://hall-booking-n72k.onrender.com/api/hall/count/alldata</p>
</div>
    
  `;
  res.send(`${welcomeMessage}<br><br>${apiLinks}`);
  
});

app.use('/api/hall',router)


// listen

app.listen(PORT, ()=>{

    console.log('The backend app is listening with PORT', PORT);
})


