import React from "react";
import { Box, Button, VStack, FormControl, FormLabel } from "@chakra-ui/react";
import { useBookingContext } from "../context/BookingContext";

const SelectTime = ({ setSelectedTime, availableTimes }) => {

    const { selectedTime } = useBookingContext();

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const timeCompare = (time1, time2) => {
        // Extract hours and AM/PM from each time string
        const [hour1, ampm1] = time1.split(' ')[0].split(':');
        const [hour2, ampm2] = time2.split(' ')[0].split(':');

        // Convert hours to 24-hour format if needed (e.g., convert 12:00 PM to 12:00)
        const hour24Format1 = ampm1 === 'PM' ? parseInt(hour1, 10) + 12 : parseInt(hour1, 10);
        const hour24Format2 = ampm2 === 'PM' ? parseInt(hour2, 10) + 12 : parseInt(hour2, 10);

        // Compare the hours
        return hour24Format1 === hour24Format2;
    };


    return (
        <FormControl>
            <FormLabel>Select Time</FormLabel>
            <VStack spacing={4} alignItems="flex-start" >
                <div className="timesContainer">
                    {availableTimes.map((time, index) => (
                        <Box
                            as='button'
                            key={index}
                            onClick={() => handleTimeClick(time)}
                            className={`time-select ${timeCompare(time, selectedTime) ? 'active' : ''}`}
                            type="button"
                        >
                            {time}
                        </Box>
                    ))}
                </div>
            </VStack>
        </FormControl>
    );
};

export default SelectTime;