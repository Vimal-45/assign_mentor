
const rooms = [{
    Number_of_Seats_available: 120,
    amenities_in_ream: "AC sand Non-AC, TV with WIFI",
    Price_for_1_Hour: 1200,
    room_name: "KDV Hall"
}];
const bookings = [
    {
        Customer_Name: 'Vimal D',
        Date: '01/11/2023',
        Start_Time: '8-AM',
        End_Time: '8-PM',
        Room_ID: 101
    },
    {
        Customer_Name: 'Dhivya',
        Date: '02/11/2023',
        Start_Time: '8-AM',
        End_Time: '8-PM',
        Room_ID: 102
    },
    {
        Customer_Name: 'Sharmila',
        Date: '03/11/2023',
        Start_Time: '8-AM',
        End_Time: '8-PM',
        Room_ID: 103
    },
    {
        Customer_Name: 'Mithran V',
        Date: '04/11/2023',
        Start_Time: '8-AM',
        End_Time: '8-PM',
        Room_ID: 104
    },
    {
        Customer_Name: 'Jinathran',
        Date: '05/11/2023',
        Start_Time: '8-AM',
        End_Time: '8-PM',
        Room_ID: 105
    },
    {
        Customer_Name: 'Jinathran',
        Date: '09/11/2023',
        Start_Time: '8-AM',
        End_Time: '8-PM',
        Room_ID: 105
    },


];




//created room if needed 
export const createRoom = (req, res) => {
    try {

        const addRoom = {

            Number_of_Seats_available: req.body.Number_of_Seats_available,
            amenities_in_ream: req.body.amenities_in_ream,
            Price_for_1_Hour: req.body.Price_for_1_Hour,
            room_name: req.body.room_name

        }
        if (addRoom) {
            rooms.push(addRoom)
            res.status(201).json({ message: 'room created sucessfully', addRoom })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error in createRoom function" })
    }

}

// get reoom details
export const getRoomDetails = (req, res) => {

    try {

        res.status(200).json({ rooms })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error in getRoomDetails function" })

    }


}

//booking room-----------/

export const bookingRoom = (req, res) => {



    try {
        const Date = req.body.Date;

        const isDateBooked = bookings.some(bookings => bookings.Date === Date)
        if (!isDateBooked) {
            const newRoomBooking = {
                Customer_Name: req.body.Customer_Name,
                Date: req.body.Date,
                Start_Time: req.body.Start_Time,
                End_Time: req.body.End_Time,
                Room_ID: bookings.length + 1
            }

            bookings.push(newRoomBooking)
            res.status(201).json({
                message: ` Room booked sucessfully and the room number is ${newRoomBooking.Room_ID}`,
                data: newRoomBooking
            })

        } else {

            res.status(403).json({ message: `this date ${req.body.Date} already booked` })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error in bookingRoom function" })
    }

}

//3. List all Rooms with Booked Data with----------------------------------------------/

export const roomsWithBookedData = (req, res) => {

    try {
        const List_Rooms_Booked_Data = bookings.map((item) => ({
            Room_name: rooms[0].room_name,
            Booked_Status: "Booked",
            ...item,
        }));



        res.status(200).json({ message: "List all Rooms with Booked Data", data: List_Rooms_Booked_Data })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error in roomsWithBookedData function" })
    }
    //4. List all customers with booked Data with-------------------------------//

}
export const customerWithBookedData = (req, res) => {
    try {
        const List_Customers_Booked_Data = bookings.map((item) => ({

            Room_name: rooms[0].room_name,
            ...item,
        }));

        res.status(200).json({ message: "List all customers with booked Data", data: List_Customers_Booked_Data })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error in customerWithBookedData function" })
    }

}



//List how many times a customer has booked the room with below details.............../
export const countsWithCustomerData = (req, res) => {
    try {

        const groubSamename = {};

        for (let i = 0; i < bookings.length; i++) {
            const bookedItem = bookings[i];
            const { Customer_Name } = bookedItem;

            if (!groubSamename[Customer_Name]) {
                groubSamename[Customer_Name] = [bookedItem];
            } else {
                groubSamename[Customer_Name].push(bookedItem);
            }
        }
        // console.log(groubSamename);
        const Count_Booked_Data = {};
        for (const key in groubSamename) {
           
             {
                Count_Booked_Data[key] = groubSamename[key].map(item => ({
                    "Room_name": rooms[0].room_name,
                    "Booked_Status": "Booked",
                    "Customer_Name": key,
                    "Date": item.Date,
                    "Start_Time": item.Start_Time,
                    "End_Time": item.End_Time

                }))
            }
        }


        
        const countData = {};
        for (const key in groubSamename) {
            countData[key] = `${groubSamename[key].length} time booked`;
        }


        // if(!Count_Booked_Data.length){

        //      res.status(200).json({message: "There is no customer" })
        // }

            // console.log(!Count_Booked_Data.length);
        res.status(200).json({
            message: "List how many times a customer has booked the room with below details",
            count: countData,
            data: Count_Booked_Data
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error in countsWithCustomerData function" })
    }

}




