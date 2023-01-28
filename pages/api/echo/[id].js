//http://localhost:3000/api/echo/33 отримаємо {"yourID":"33"}
export default function getById(req, res) {
  // res.statusCode = 200;
  // res.setHeader("Content-Type", "application/json");
  // res.end(req.query.id);
  res.json({ yourID: req.query.id });
}
