import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';

const ReservationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [mobileModel, setMobileModel] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [preferredDate, setPreferredDate] = useState(new Date());
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8081/mobiles/reservations');
                setReservations(response.data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        fetchReservations();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReservation = {
            name,
            email,
            phone,
            mobile_model: mobileModel,
            issue_description: issueDescription,
            preferred_date: preferredDate.toISOString().split('T')[0],
        };

        try {
            await axios.post('http://localhost:8081/mobiles/reservations', newReservation);
            alert("Reservation created successfully!");
        } catch (error) {
            console.error("Error creating reservation:", error);
            alert("Failed to create reservation. Please try again.");
        }
    };

    const isDateReserved = (date) => {
        return reservations.some(
            (reservation) => new Date(reservation.preferred_date).toDateString() === date.toDateString()
        );
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Appointment booking for service</h2>
            <form onSubmit={handleSubmit} className="mb-5">
                <div className="column d-flex flex-column align-items-center">
                    <div className="col-sm-6">
                        <div className="form-group mb-4">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label>Mobile number</label>
                            <input
                                type="tel"
                                className="form-control"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label>Type of mobile phone</label>
                            <input
                                type="text"
                                className="form-control"
                                value={mobileModel}
                                onChange={(e) => setMobileModel(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group mb-4">
                            <label>Problem description</label>
                            <textarea
                                className="form-control"
                                value={issueDescription}
                                onChange={(e) => setIssueDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group mb-4 d-flex flex-column align-items-center">
                            <label>Select your preferred date</label>
                            <Calendar
                                value={preferredDate}
                                onChange={setPreferredDate}
                                tileDisabled={({ date }) => isDateReserved(date)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-sm-6 text-center">
                        <button type="submit" className="btn btn-primary mt-3">Book an appointment</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;
