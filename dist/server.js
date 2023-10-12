"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const client = axios_1.default.create({
    baseURL: 'https://jsonplaceholder.typicode.com/posts',
});
app.get('/api/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield client.get('');
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/api/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield client.get(`${id}`);
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: 'The post with the given ID was not found' });
    }
}));
app.post('/api/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = req.body;
    try {
        const response = yield client.post('', newPost);
        res.status(201).json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not complete the request' });
    }
}));
app.put('/api/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const updatedPost = req.body;
    try {
        const response = yield client.put(`${id}`, updatedPost);
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not update the post with given id' });
    }
}));
app.delete('/api/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield client.delete(`${id}`);
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Could not delete the post with the given id' });
    }
}));
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
//# sourceMappingURL=server.js.map