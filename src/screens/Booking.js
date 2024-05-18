import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import '../App.css';
import BackHeader from '../components/backHeader.js';
import { insert, useFormik } from "formik";
import Button from '../components/button';
import * as Yup from 'yup';

import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

import SelectTime from "../components/selectTime";

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

import {
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Textarea,
    VStack,
} from "@chakra-ui/react";

const BookingContext = createContext();

const morningTimes = [];
for (let i = 10; i <= 14; i++) {
    morningTimes.push(`${i < 12 ? i : i - 12}:00 ${i < 12 ? 'AM' : 'PM'}`);
}
// Generate an array of times from 5 PM to 8 PM
const eveningTimes = [];
for (let i = 17; i <= 20; i++) {
    eveningTimes.push(`${i < 12 ? i : i - 12}:00 ${i < 12 ? 'AM' : 'PM'}`);
}
// Combine the morning and evening times
const availableTimes = [...morningTimes, ...eveningTimes];

function getCurrentTime() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentAmPm = currentHour < 12 ? "AM" : "PM";
    const formattedHour = currentHour % 12 || 12;
    const formattedMinutes = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
    return `${formattedHour}:${formattedMinutes} ${currentAmPm}`;
}

// Define a reducer function to handle state changes
const timesReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            const selectedDate = new Date(action.payload);
            const dayOfWeek = selectedDate.getDay(); // 0 (Sunday) to 6 (Saturday)

            console.log(selectedDate, dayOfWeek);

            let updatedTimes = [];

            // Check if the selected day is a weekend (Saturday or Sunday)
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                // Weekend: include times from 10 AM to 2 PM
                for (let i = 10; i <= 14; i++) {
                    updatedTimes.push(`${i <= 12 ? i : i - 12}:00 ${i < 12 ? 'AM' : 'PM'}`);
                }
            } else {
                // Weekday: include times from 10 AM to 2 PM and 5 PM to 8 PM
                for (let i = 10; i <= 14; i++) {
                    updatedTimes.push(`${i <= 12 ? i : i - 12}:00 ${i < 12 ? 'AM' : 'PM'}`);
                }
                for (let i = 17; i <= 20; i++) {
                    updatedTimes.push(`${i < 12 ? i : i - 12}:00 ${i < 12 ? 'AM' : 'PM'}`);
                }
            }

            return updatedTimes;

        default:
            return state;
    }
};

const BookingScreen = ({ navigation }) => {

    const [timesList, dispatch] = useReducer(timesReducer, availableTimes);
    const [selectedTime, setSelectedTime] = useState(getCurrentTime());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [numGuest, setNumGuest] = useState('2');
    // const [selectedTime, dispatch] = useReducer(timesReducer, availableTimes);


    const { isLoading, response, submit } = useSubmit();
    //const { onOpen } = useAlertContext();

    const {
        errors,
        touched,
        getFieldProps,
    } = useFormik({
        initialValues: {
            firstName: '',
            email: '',
            type: '',
            comment: '',
        },
        onSubmit: (values) => {
            submit("", values)
        },
        validationSchema: Yup.object().shape({
            numGuest: Yup.number().required('Number of guest?'),
            firstName: Yup.string().required('First name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            type: Yup.string().required('A type is required'),
            comment: Yup.string().required('a comment is required').min(25, "Must be at least 25 characters"),
        }),
    });

    useEffect(() => {
        if (response) {
            console.log(response);
            // Handle response
            if (response.type === 'success') {
                // onOpen('success', `Thank you, ${values.firstName}. Your message has been sent.`);
                //resetForm();
            } else {
                // onOpen('error', 'An unexpected error occurred. Please try again later.');
            }
        }
    }, [response]);

    useEffect(() => {
        // Dispatch action to update times list based on selected date
        console.log("Update Times", selectedDate);
        //dispatch({ type: 'UPDATE_TIMES', payload: selectedDate });
    }, [selectedDate]);

    useEffect(() => {
        console.log(numGuest);
        //dispatch({ type: 'UPDATE_TIMES', payload: selectedTime });
    }, [numGuest]);

    useEffect(() => {
        console.log(selectedTime);
        //dispatch({ type: 'UPDATE_TIMES', payload: selectedTime });
    }, [selectedTime]);

    const handleNumGuestChange = (valueString) => {
        // Log the value change
        console.log('Number of guests changed:', valueString);
        // Update the state with the new value
        setNumGuest(valueString);
    };

    return (
        <BookingContext.Provider value={{ numGuest, selectedTime, selectedDate }}>
            <BackHeader title="Booking"></BackHeader>
            <VStack className="flex-center" alignItems="center" >
                <Box p={6} rounded="md" w="100%">
                    <form >
                        <VStack className="flex-start" spacing={4}>
                            <div className="table-input">
                                <FormControl isInvalid={errors.type && touched.type}>
                                    <FormLabel htmlFor="numGuest">Number of Guest</FormLabel>
                                    <NumberInput
                                        id="numGuest"
                                        name="numGuest"
                                        min={1} max={20}
                                        onChange={handleNumGuestChange}
                                        value={numGuest}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <FormErrorMessage>{errors.type}</FormErrorMessage>
                                </FormControl>
                                <FormControl >
                                    <FormLabel htmlFor="bookingDateTime">Date and Time</FormLabel>
                                    <Input placeholder='Select Date and Time' size='md' type='date' min="2024-04-01"
                                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                        value={selectedDate.toISOString().substr(0, 10)}
                                    />
                                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="timeSelect">
                                <SelectTime availableTimes={timesList} setSelectedTime={setSelectedTime} ></SelectTime>
                            </div>
                            <FormControl isInvalid={errors.firstName && touched.firstName} >
                                <FormLabel htmlFor="firstName">Name</FormLabel>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    {...getFieldProps('firstName')}
                                    width='100%'
                                />
                                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.email && touched.email}>
                                <FormLabel htmlFor="email">Email Address</FormLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    {...getFieldProps('email')}
                                />
                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.type && touched.type}>
                                <FormLabel htmlFor="firstName">Phone</FormLabel>
                                <Input
                                    id="phone"
                                    name="phone"
                                    {...getFieldProps('phone')}
                                    width='100%'
                                />
                                <FormErrorMessage>{errors.type}</FormErrorMessage>
                            </FormControl>
                            className="secondary"
                        </VStack>
                        <Button className="inactive" type="submit" width="full" isLoading={isLoading} to="checkout">
                            Submit
                        </Button>
                    </form>
                </Box>
            </VStack>
        </BookingContext.Provider>
    );
};

const useBookingContext = () => useContext(BookingContext);

export { BookingScreen, useBookingContext };