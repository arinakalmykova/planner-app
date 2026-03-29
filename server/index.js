import express from 'express';
import cors from "cors";
import {getRoutes, addRoute, updateRoute, deleteRoute} from "./routes.js";

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/routes", (req,res) => {
    res.json(getRoutes());
});

app.post("/routes", (req,res) => {
    const newRoute = addRoute(req.body);
    res.status(201).json(newRoute);
});


app.put("/routes/:id", (req,res) => {
    const updated = updateRoute(req.params.id, req.body);
    if(!updated) return res.status(404).json({error: "Маршрут не найден"});
    res.json(updated);
});

app.delete("/routes/:id", (req,res) => {
    deleteRoute(req.params.id);
    res.json({sucess: true});
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});