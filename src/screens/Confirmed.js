// Inside Checkout.js

import React from 'react';
import Button from '../components/button';

import logo from '../assets/logo.png';

const ConfirmScreen = () => {

    //const { numGuest, selectedTime, selectedDate, name, phone, email } = useBookingContext();

    // Now you can use numGuest, selectedTime, and selectedDate in your component

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="" alt="logo" />
                    <p>Your Booking Has been confirmed</p>
                    <Button className="frmBtn secondary btn" to="home" width="full" >
                        See you soon!
                    </Button>

                </header>
            </div>

        </>
    );
};

export { ConfirmScreen };