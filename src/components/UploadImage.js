// uploadImage.js
import axios from 'axios';

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await axios.post('http://localhost:9999/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data.imageUrl;
};
