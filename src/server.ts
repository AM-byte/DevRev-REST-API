import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.json());

const client = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/posts',
});

// READ
app.get('/api/posts', async (req: express.Request, res: express.Response) => {
    try {
        const response = await client.get('');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/posts/:id', async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);

    try {
        const response = await client.get(`${id}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'The post with the given ID was not found' });
    }
});

// CREATE
app.post('/api/posts', async (req: express.Request, res: express.Response) => {
    const newPost = req.body;

    try {
        const response = await client.post('', newPost);
        res.status(201).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not complete the request' });
    }
});

// UPDATE
app.put('/api/posts/:id', async (req: express.Request, res: express.Response) => {
    const id: number = parseInt(req.params.id);
    const updatedPost = req.body;

    try {
        const response = await client.put(`${id}`, updatedPost);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not update the post with given id' });
    }
});

// DELETE
app.delete('/api/posts/:id', async (req: express.Request, res: express.Response) => {
    const id: number = parseInt(req.params.id);

    try {
        const response = await client.delete(`${id}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Could not delete the post with the given id' })
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});