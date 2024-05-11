import React, { useEffect } from "react";
import '../App.css';
import BackHeader from '../components/backHeader.js';
import { useFormik } from "formik";
import Button from '../components/button';
import * as Yup from 'yup';

import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

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

const BookingScreen = ({ navigation }) => {

    const { isLoading, response, submit } = useSubmit();
    //const { onOpen } = useAlertContext();

    const {
        values,
        errors,
        touched,
        getFieldProps,
        handleSubmit,
        //resetForm
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

    return (
        <div className="">
            <BackHeader title="Booking"></BackHeader>

                <VStack p={32} className="flex-center" alignItems="center" >
                    <Box p={6} rounded="md" w="100%">
                        <form onSubmit={handleSubmit}>
                            <VStack className="flex-start" spacing={4}>
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
                                    <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                                    <Select
                                        {...getFieldProps('type')}
                                        id="type"
                                        name="type"
                                    >
                                        <option value="hireMe">Freelance project proposal</option>
                                        <option value="openSource">
                                            Open source consultancy session
                                        </option>
                                        <option value="other">Other</option>
                                    </Select>
                                    <FormErrorMessage>{errors.type}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.comment && touched.comment}>
                                    <FormLabel htmlFor="comment">Your message</FormLabel>
                                    <Textarea
                                        id="comment"
                                        name="comment"
                                        {...getFieldProps('comment')}
                                        height={250}
                                    />
                                    <FormErrorMessage>{errors.comment}</FormErrorMessage>
                                </FormControl>
                                <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
                                    Submit
                                </Button>
                            </VStack>
                        </form>
                    </Box>
                </VStack>
        </div>

    );
};

export default BookingScreen;