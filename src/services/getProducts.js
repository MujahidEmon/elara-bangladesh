import axios from "axios"

export const getProducts = async() =>{
    const {data} = await axios.get('/api/products');
    return data;
}

export const getProductById = async(id) =>{
    const {data} = await axios.get(`http://localhost:3000/api/products/${id}`);
    return data;
}