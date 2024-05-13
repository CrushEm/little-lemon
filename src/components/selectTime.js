import React from "react";
import { Button, VStack, FormControl, FormLabel } from "@chakra-ui/react";
import { useBookingContext } from "../screens/Booking";


const SelectTime = ({ setSelectedTime, availableTimes }) => {

    const bookingData = useBookingContext();

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    return (
        <FormControl>
            <FormLabel>Select Time</FormLabel>
            <VStack spacing={4} alignItems="flex-start">
                {availableTimes.map((time, index) => (
                    <Button key={index} onClick={() => handleTimeClick(time)}>
                        {time}
                    </Button>
                ))}
            </VStack>
        </FormControl>
    );
};

export default SelectTime;