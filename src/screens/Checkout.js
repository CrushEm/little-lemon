// Inside Checkout.js

import React from 'react';
import { useBookingContext } from './BookingScreen';

const Checkout = () => {
    // Access context values using useBookingContext hook
    const { numGuest, selectedTime, selectedDate } = useBookingContext();

    // Now you can use numGuest, selectedTime, and selectedDate in your component

    return (
        <div>
            <h2>Checkout</h2>
            <p>Number of Guests: {numGuest}</p>
            <p>Selected Time: {selectedTime}</p>
            <p>Selected Date: {selectedDate.toISOString().substr(0, 10)}</p>
            {/* Add more checkout-related content here */}
        </div>
    );
};

export default Checkout;