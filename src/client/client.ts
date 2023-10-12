import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
    const getAllButton = document.getElementById('readAll') as HTMLButtonElement;
    const getOneButton = document.getElementById('readPost') as HTMLButtonElement;
    const createButton = document.getElementById('create') as HTMLButtonElement;
    const updateButton = document.getElementById('update') as HTMLButtonElement;
    const deleteButton = document.getElementById('delete') as HTMLButtonElement;
    const inputID = document.getElementById('inputID') as HTMLInputElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;

    const client = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com/posts',
    });

    getAllButton.addEventListener('click', () => {
        client.get('')
            .then((response) => {
                display(response.data);
            })
            .catch((error) => {
                display({ error: error.message })
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
    })

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
                display({ message: `Post with ${id} was deleted`});
            })
            .catch((error) => {
                display({ error: error.message });
            });
    })

    function display(data: any) {
        resultDiv.innerHTML = JSON.stringify(data, null, 2);
    }
});