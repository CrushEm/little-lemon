import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookingScreen from './Booking';
import { BookingProvider } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';

// jest.mock('../components/backHeader', () => () => <div>BackHeader</div>);
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

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const mockContextValue = {
    numGuest: 2,
    setNumGuest: jest.fn(),
    selectedTime: '12:00 PM',
    setSelectedTime: jest.fn(),
    selectedDate: new Date(),
    setSelectedDate: jest.fn(),
    timesList: ['12:00 PM', '1:00 PM'],
    dispatch: jest.fn(),
    setName: jest.fn(),
    setPhone: jest.fn(),
    setEmail: jest.fn(),
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
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date and time/i)).toBeInTheDocument();

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });

    // Simulate form submission
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

});

test('shows validation errors when form fields are empty', async () => {
    renderComponent();

    // Try to submit the form without filling out any fields
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    // Check for validation error messages
    await waitFor(() => {
        expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
        expect(screen.getByText(/your phone number is required/i)).toBeInTheDocument();
    });
});
