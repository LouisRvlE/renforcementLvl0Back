import { MongoClient, ObjectId } from "mongodb";

const mongo_url = "mongodb://localhost:27017";
const client = new MongoClient(mongo_url);

const db = client.db("tuitodo");
const todos = db.collection("todos");

export const getTodos = async () => await todos.find({}).toArray();

export const createTodo = async (name: string, description: string) => {
    const todo = {
        title: name,
        body: description,
        createdAt: new Date(),
    };
    return await todos.insertOne(todo);
};

export const deleteTodo = async (_id: string) => {
    return await todos.deleteOne({
        _id: new ObjectId(_id),
    });
};
