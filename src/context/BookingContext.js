// BookingContext.js
import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';

const BookingContext = createContext();
const fetchAPI = window.fetchAPI;
console.log(fetchAPI);

const morningTimes = [];
for (let i = 10; i <= 14; i++) {
    morningTimes.push(`${i < 12 ? i : i - 12}:00 ${i < 12 ? 'AM' : 'PM'}`);
}

const eveningTimes = [];
for (let i = 17; i <= 20; i++) {
    eveningTimes.push(`${i < 12 ? i : i - 12}:00 ${i < 12 ? 'AM' : 'PM'}`);
}

const availableTimes = [...morningTimes, ...eveningTimes];

const timesReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            const selectedDate = new Date(action.payload);
            const dayOfWeek = selectedDate.getDay();
            let updatedTimes = [];
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                for (let i = 10; i <= 14; i++) {
                    updatedTimes.push(`${i <= 12 ? i : i - 12}:00 ${i < 12 ? 'AM' : 'PM'}`);
                }
            } else {
                for (let i = 10; i <= 14; i++) {
                    updatedTimes.push(`${i <= 12 ? i : i - 12}:00 ${i < 12 ? 'AM' : 'PM'}`);
                }
                for (let i = 17; i <= 20; i++) {
                    updatedTimes.push(`${i < 12 ? i : i - 12}:00 ${i < 12 ? 'AM' : 'PM'}`);
                }
            }
            return updatedTimes;
        case 'API_TIMES' :
            return action.payload
        default:
            return state;
    }
};

const BookingProvider = ({ children }) => {
    const [timesList, dispatch] = useReducer(timesReducer, availableTimes);
    const [selectedTime, setSelectedTime] = useState(getCurrentTime());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [numGuest, setNumGuest] = useState('2');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    function getCurrentTime() {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        const currentAmPm = currentHour < 12 ? 'AM' : 'PM';
        const formattedHour = currentHour % 12 || 12;
        const formattedMinutes = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes;
        return `${formattedHour}:${formattedMinutes} ${currentAmPm}`;
    }

    useEffect(() => {
        // const fetchTimes = async () => {
        //     const times = await fetchAPI(selectedDate);
        //     dispatch({ type: 'API_TIMES', payload: times });
        // };
        // fetchTimes();
    }, [selectedDate]);


    return (
       <BookingContext.Provider value={{ 
           numGuest, 
           setNumGuest, 
           selectedTime, 
           setSelectedTime, 
           selectedDate, 
           setSelectedDate, 
           timesList, 
           dispatch, 
           name,
           setName,
           phone,
           setPhone,
           email,
           setEmail,
        }}>
            {children}
        </BookingContext.Provider>
    );
};

const useBookingContext = () => useContext(BookingContext);

export { BookingProvider, useBookingContext };
