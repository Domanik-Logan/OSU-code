import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async(name, reps, weight, unit, date) => {
    const myUser = new exercise({name:name, reps:reps, weight:weight, unit:unit, date:date});
    return myUser.save();
}

const findExercise = async(filter) => {
    const query = exercise.find(filter);
    return query.exec();
};

const findExerciseId = async(filter) => {
    const query = exercise.findById(filter);
    return query.exec();
};

const findOneExercise = async(filter) => {
    const query = exercise.findOne(filter);
    return query.exec();
};

const updateExercise= async(_id, name, reps, weight, unit, date ) => {
    const result = await exercise.replaceOne({_id: _id}, {name: name, reps: reps, weight: weight, unit: unit, date: date});
    return result.modifiedCount;
};

const deleteExercise = async(filter) => {
    const query = exercise.findById(filter);
    const result = await exercise.deleteMany(query);
    return result.deletedCount;
};

export {createExercise, findExercise, findExerciseId, findOneExercise, updateExercise, deleteExercise};

