import React, { useState } from 'react';
import { useHref, useNavigate } from 'react-router-dom';

export const AddExercisePage = () => {

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate("/");
    };

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const addExericse = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises' , {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201) {
            alert("Successfully added the exercise");
        }
        else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h1 id='addExer'>Add Exercise</h1>
            <input
                type="text"
                placeholder="Enter Name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                value={weight}
                placeholder="Enter Weight here"
                onChange={e => setWeight(e.target.value)} />
            <input
                type="text"
                placeholder="Enter Unit here"
                value={unit}
                onChange={e => setUnit(e.target.value)} />
            <input
                type="text"
                placeholder="Enter Date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExericse}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;