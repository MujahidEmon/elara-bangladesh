let db;
export const connectDB = async () => {
    if(db){
        return db
    }

    try {
        
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}