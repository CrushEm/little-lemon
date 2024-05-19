// Inside Checkout.js

import React from 'react';

import BackHeader from '../components/backHeader';

const ConfirmScreen = () => {

    //const { numGuest, selectedTime, selectedDate, name, phone, email } = useBookingContext();

    // Now you can use numGuest, selectedTime, and selectedDate in your component

    return (
        <>
            <BackHeader title="Confirm Booking" />
            <div>
                <h2>Your Booking Has been confirmed</h2>=
            </div>
        </>
    );
};

export { ConfirmScreen };