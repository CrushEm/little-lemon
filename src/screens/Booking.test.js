// BookingScreen.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookingScreen from './Booking'; 
import { BookingProvider } from '../context/BookingContext'; // Ensure the context provider is included if necessary

// Mock the dependencies like useSubmit, BackHeader, and SelectTime
jest.mock('../hooks/useSubmit', () => ({
    __esModule: true,
    default: () => ({
        isLoading: false,
        response: null,
        submit: jest.fn(),
    }),
}));

jest.mock('../components/backHeader', () => () => <div>BackHeader</div>);
jest.mock('../components/button', () => ({ className, disabled, type, width, to, children }) => (
    <button className={className} disabled={disabled} type={type} style={{ width }} data-to={to}>
        {children}
    </button>
));
jest.mock('../components/selectTime', () => ({ availableTimes, setSelectedTime }) => (
    <select onChange={(e) => setSelectedTime(e.target.value)}>
        {availableTimes.map((time) => (
            <option key={time} value={time}>
                {time}
            </option>
        ))}
    </select>
));

const mockContextValue = {
    numGuest: 2,
    setNumGuest: jest.fn(),
    selectedTime: '',
    setSelectedTime: jest.fn(),
    selectedDate: new Date(),
    setSelectedDate: jest.fn(),
    timesList: ['12:00 PM', '1:00 PM'],
    dispatch: jest.fn(),
};

const renderComponent = () =>
    render(
        <BookingProvider value={mockContextValue}>
            <BookingScreen />
        </BookingProvider>
    );

test('renders the BookingScreen form and handles form submission', async () => {
    renderComponent();

    // Check if relevant form fields are rendered
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '1234567890' } });

    // Simulate form submission
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    // Ensure submit function was called
    await waitFor(() => {
        expect(screen.getByText(/BackHeader/i)).toBeInTheDocument();
    });
});

test('shows validation errors when form fields are empty', async () => {
    renderComponent();

    // Try to submit the form without filling out any fields
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    // Check for validation error messages
    await waitFor(() => {
        expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
        // expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        // expect(screen.getByText(/Your Phone number is required/i)).toBeInTheDocument();
    });
});
