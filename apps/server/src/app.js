import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Yecommerce service is up and running.');
})

export default app;
