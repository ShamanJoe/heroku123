import { Router } from "express";

export function ArticleApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const article = await mongoDatabase
      .collection("eksamen")
      .find()
      .map(({ title, plot, category, author }) => ({
        title,
        plot,
        category,
        author
      }))
      //.limit()
      .toArray();
    res.json(article);
  });

  router.post("/", (req, res) => {
    const { title, plot, category, author } = req.body;
    mongoDatabase.collection("eksamen").insertOne({
      title,
      plot,
      category,
        author
    });
    res.sendStatus(500);
  });
  return router;
}
