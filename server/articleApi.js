import { Router } from "express";

export function ArticleApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const article = await mongoDatabase
      .collection("eksamen")
      .find()
      .map(({ title, plot, category }) => ({
        title,
        plot,
        category,
      }))
      //.limit()
      .toArray();
    res.json(article);
  });

  router.post("/new", (req, res) => {
    const { title, plot, category } = req.body;
    const result = mongoDatabase.collection("eksamen").insertOne({
      title,
      plot,
      category,
    });
    res.sendStatus(500);
  });
  return router;
}
