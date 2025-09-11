import express from 'express';

const app: express.Application = express();

const PORT = 5000;

app.get('/', (_, res: express.Response) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
