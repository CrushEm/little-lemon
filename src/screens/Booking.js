import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import BackHeader from '../components/backHeader';
import Button from '../components/button';
import SelectTime from '../components/selectTime';

import { useBookingContext } from '../context/BookingContext';

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import useSubmit from "../hooks/useSubmit";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ ; 

const BookingScreen = () => {
    const { numGuest, setNumGuest, selectedTime, setSelectedTime, selectedDate, setSelectedDate, timesList, dispatch, setName, setPhone,setEmail, } = useBookingContext();
    const navigate = useNavigate();

    const { isLoading, response, submit } = useSubmit();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            email: '',
            //type: '',
            phone: '',
        },
        onSubmit: (values) => {
            //console.log(values);
            submit("", values);
            if (values) {
                setEmail(values.email);
                setName(values.firstName);
                setPhone(values.phone);
                navigate('/checkout'); // Navigate to checkout page after successful submission
            }
        },
        validationSchema: Yup.object().shape({
            //numGuest: Yup.number().required('Number of guest?'),
            firstName: Yup.string().required('First name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            //type: Yup.string().required('A type is required'),
            phone: Yup.string().required('Your Phone number is required.').min(10, 'Phone number must be at least 10 digits').matches(phoneRegExp, 'Phone number is not valid'),
        }),
    });

    useEffect(() => {
        if (response) {
            console.log(response);
        }
    }, [response]);

    // useEffect(() => {
    //     //console.log(numGuest);
    // }, [numGuest]);

    useEffect(()=>{
        console.log(selectedDate);
        dispatch({ type: 'UPDATE_TIMES', payload: selectedDate });
    }, [selectedDate, dispatch])

    useEffect(() => {
        console.log(selectedTime);
    }, [selectedTime]);

    const handleNumGuestChange = (valueString) => {
        setNumGuest(valueString);
    };

    return (
        <>
            <BackHeader title="Booking" />
            <VStack className="flex-center" alignItems="center">
                <Box p={6} rounded="md" w="100%">
                    <form onSubmit={formik.handleSubmit}>
                        <VStack className="flex-start" spacing={4}>
                            <div className="table-input">
                                <FormControl isInvalid={formik.errors.numGuest && formik.touched.numGuest}>
                                    <FormLabel id="numGuestLabel" htmlFor="numGuest">Number of Guest</FormLabel>
                                    <NumberInput
                                        id="numGuest"
                                        name="numGuest"
                                        min={1} max={20}
                                        onChange={handleNumGuestChange}
                                        value={numGuest}
                                        aria-labelledby="numGuestLabel"
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <FormErrorMessage>{formik.errors.numGuest}</FormErrorMessage>
                                </FormControl>
                                <FormControl>
                                    <FormLabel id="dateLabel" htmlFor="bookingDateTime">Date and Time</FormLabel>
                                    <Input
                                        id="bookingDateTime"
                                        placeholder='Select Date and Time'
                                        size='md'
                                        type='date'
                                        min="2024-04-01"
                                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                        value={selectedDate.toISOString().substr(0, 10)}
                                        aria-labelledby="dateLabel"
                                    />
                                    <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="timeSelect">
                                <SelectTime availableTimes={timesList} setSelectedTime={setSelectedTime} />
                            </div>
                            <FormControl isInvalid={formik.errors.firstName && formik.touched.firstName}>
                                <FormLabel id="nameLabel" htmlFor="firstName">Name</FormLabel>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    {...formik.getFieldProps('firstName')}
                                    width='100%'
                                    aria-labelledby="nameLabel"
                                />
                                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                                <FormLabel id="emailLabel" htmlFor="email">Email Address</FormLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    {...formik.getFieldProps('email')}
                                    aria-labelledby="emailLabel"
                                />
                                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={formik.errors.phone && formik.touched.phone}>
                                <FormLabel id="phoneLabel" htmlFor="phone">Phone</FormLabel>
                                <Input
                                    id="phone"
                                    name="phone"
                                    {...formik.getFieldProps('phone')}
                                    width='100%'
                                    aria-labelledby="phoneLabel"
                                />
                                <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                            </FormControl>
                        </VStack>
                        <Button className="frmBtn primary" disabled={!formik.isValid} type="submit" width="full" >
                            Submit
                        </Button>
                    </form>
                </Box>
            </VStack>
        </>
    );
};

export default BookingScreen
