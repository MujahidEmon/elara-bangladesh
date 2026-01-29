import axios from "axios"

export const getProducts = async() =>{
    const {data} = await axios.get('http://localhost:3000/products/api/get-all');
    return data;
}

export const getProductById = async(id) =>{
    const {data} = await axios.get(`http://localhost:3000/products/api/${id}`);
    return data;
}