import axios from "axios"

export const getProducts = async(search = "") =>{
    const {data} = await axios.get('/api/products', {
        params: search ? { search } : {},
    });
    return data;
}

export const getProductById = async(id) =>{
    const {data} = await axios.get(`/api/products/${id}`);
    return data;
}
