// Inside Checkout.js

import React from 'react';
import { useBookingContext } from '../context/BookingContext';
import BackHeader from '../components/backHeader';

const CheckoutScreen = () => {

    const { numGuest, selectedTime, selectedDate } = useBookingContext();

    // Now you can use numGuest, selectedTime, and selectedDate in your component

    return (
        <>
            <BackHeader title="Confirm Booking" />
        <div>
            <h2>Checkout</h2>
            <p>Number of Guests: {numGuest}</p>
            <p>Selected Time: {selectedTime}</p>
            <p>Selected Date: {selectedDate.toISOString().substr(0, 10)}</p>
        </div>
        </>
    );
};

export { CheckoutScreen };