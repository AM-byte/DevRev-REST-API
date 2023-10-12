"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
document.addEventListener('DOMContentLoaded', () => {
    const getAllButton = document.getElementById('readAll');
    const getOneButton = document.getElementById('readPost');
    const createButton = document.getElementById('create');
    const updateButton = document.getElementById('update');
    const deleteButton = document.getElementById('delete');
    const inputID = document.getElementById('inputID');
    const resultDiv = document.getElementById('result');
    const client = axios_1.default.create({
        baseURL: 'https://jsonplaceholder.typicode.com/posts',
    });
    getAllButton.addEventListener('click', () => {
        client.get('')
            .then((response) => {
            display(response.data);
        })
            .catch((error) => {
            display({ error: error.message });
        });
    });
    getOneButton.addEventListener('click', () => {
        const id = inputID.value;
        client.get(`${id}`)
            .then((response) => {
            display(response.data);
        })
            .catch((error) => {
            display({ error: error.message });
        });
    });
    createButton.addEventListener('click', () => {
        const newPost = {
            userId: 1,
            title: 'new post',
            body: 'this is the body of the new post.',
        };
        client.post('', newPost)
            .then((response) => {
            display(response.data);
        })
            .catch((error) => {
            display({ error: error.message });
        });
    });
    updateButton.addEventListener('click', () => {
        const id = inputID.value;
        const updatedPost = {
            title: 'updated post',
            body: 'the body of this post has been updated.',
        };
        client.put(`/${id}`, updatedPost)
            .then((response) => {
            display(response.data);
        })
            .catch((error) => {
            display({ error: error.message });
        });
    });
    deleteButton.addEventListener('click', () => {
        const id = inputID.value;
        client.delete(`${id}`)
            .then(() => {
            display({ message: `Post with ${id} was deleted` });
        })
            .catch((error) => {
            display({ error: error.message });
        });
    });
    function display(data) {
        resultDiv.innerHTML = JSON.stringify(data, null, 2);
    }
});
//# sourceMappingURL=client.js.map