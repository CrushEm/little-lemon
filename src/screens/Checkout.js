// Inside Checkout.js

import React from 'react';
import { useBookingContext } from '../context/BookingContext';
import BackHeader from '../components/backHeader';

const CheckoutScreen = () => {

    const { numGuest, selectedTime, selectedDate, name, phone, email } = useBookingContext();

    // Now you can use numGuest, selectedTime, and selectedDate in your component

    return (
        <>
            <BackHeader title="Confirm Booking" />
        <div>
            <h2>Confirm Booking</h2>
            <p>Name: {name}</p>
                <p>Phone: {phone}</p>
                <p>Email: {email}</p>
            <p>Number of Guests: {numGuest}</p>
            <p>Selected Time: {selectedTime}</p>
            <p>Selected Date: {selectedDate.toISOString().substr(0, 10)}</p>
        </div>
        </>
    );
};

export { CheckoutScreen };