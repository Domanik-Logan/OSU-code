import 'dotenv/config';
import * as exercises from './exercise_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new movie with the title, year and language provided in the body
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Request Failed'});
        });
    
});


/**
 * Retrive the movie corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseId(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise);
            }
            else {
                res.status(404).json({ Error: 'Resource not found'});
            }
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Request failed'});
        });
});

/**
 * Retrieve movies. 
 * If the query parameters include a year, then only the movies for that year are returned.
 * Otherwise, all movies are returned.
 */
app.get('/exercises', (req, res) => {
    let filter = {};
    if (req.query.name !== undefined) {
        filter.name = req.query.name;
    }
    if (req.query.reps !== undefined) {
        filter.reps = req.query.reps;
    }
    if (req.query.weight !== undefined) {
        filter.weight = req.query.weight;
    }
    if (req.query.unit !== undefined) {
        filter.unit = req.query.unit;
    }
    if (req.query.date !== undefined) {
        filter.date = req.query.date;
    }

    exercises.findExercise(filter, '', 0)
        .then(exercise => {
            res.send(exercise);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });

});

/**
 * Update the movie whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    exercises.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(numUpdated => {
        if (numUpdated  === 1) {
            res.status(201).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date });
        } else {
            res.status(404).json({ Error: 'Resource not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request failed' });
    });
});

/**
 * Delete the movie whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteExercise(req.params._id)
    .then(deletedCount => {
        if (deletedCount === 1) {
            res.status(204).send();
        } else {
            res.status(404).json({ Error: 'Resource not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.send({ error: 'Request failed' });
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});