import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/exerciseList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const [exercise, setExercise] = useState([]);

    const navigate = useNavigate();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const newExercises = exercise.filter(e => e._id !== _id);
            setExercise(newExercises);
        } else {
            console.error(`Failed to delete movie with id = ${_id}, status code = ${response.status}`)
        }
    }

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    }


    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercise(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);


    return (
        <>
            <h2 id='homeHead'>List of Exercises</h2>
            <ExerciseList exercise={exercise} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <Link to="/add-exercise" id='addPage'>Add an Exercise</Link>
        </>
    );
}

export default HomePage;