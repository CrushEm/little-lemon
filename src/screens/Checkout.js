// Inside Checkout.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingContext } from '../context/BookingContext';
import BackHeader from '../components/backHeader';
import Button from '../components/button';

const submitAPI = window.fetchAPI;
console.log(submitAPI);

const CheckoutScreen = () => {

    const { numGuest, selectedTime, selectedDate, name, phone, email } = useBookingContext();
    const navigate = useNavigate();
    // Now you can use numGuest, selectedTime, and selectedDate in your component

    const submitForm = () => {

        const formDataArray = [
            { label: 'Number of Guests', value: numGuest },
            { label: 'Selected Time', value: selectedTime },
            { label: 'Selected Date', value: selectedDate },
            { label: 'Name', value: name },
            { label: 'Phone', value: phone },
            { label: 'Email', value: email }
        ];

        // const response = await submitAPI(formDataArray);
        // if (response) {
        //     navigate('/confirm');
        // }
        navigate('/confirm');
    };



    return (
        <>
            <BackHeader title="Confirm Booking" />
            <div className="App left">


                    <div>
                        <h2>Confirm Booking</h2>
                        <p>Name: {name}</p>
                        <p>Phone: {phone}</p>
                        <p>Email: {email}</p>
                        <p>Number of Guests: {numGuest}</p>
                        <p>Selected Time: {selectedTime}</p>
                        <p>Selected Date: {selectedDate.toISOString().substr(0, 10)}</p>
                    </div>
                    <Button className="frmBtn btn" onSubmit={submitForm} width="full" >
                        Submit
                    </Button>
  
            </div>

        </>
    );
};

export { CheckoutScreen };