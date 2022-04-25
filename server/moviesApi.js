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
        const movies = await mongoDatabase.collection("movies")
            .find()
            .map(({title, year, plot, poster}) =>({
                title, year, plot, poster
            }))
            .limit(1000)
            .toArray();
        res.json(movies)
    });

    router.post("/new", (req, res) => {
        res.sendStatus(500)
    });
    return router;
}
