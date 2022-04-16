import {Router} from "express";

export function MoviesApi(mongoDatabase) {
    const router = new Router();

    const movies = [
        {
            title: "Movie 1"
        },
        {
            title: "Movie 2"
        },

    ];

    router.get("/", async(req, res) => {
        const movies = await mongoDatabase.collection("eksamen").find().toArray();
        res.json(movies)
    });

    router.post("/new", (req, res) => {
        res.sendStatus(500)
    });
    return router;
}