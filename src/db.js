import mongoose from "mongoose";

const url = 'mongodb+srv://fedeherrera:4AYz4ktX1Bt9SsFI@cluster0.vgw0ujb.mongodb.net/?retryWrites=true&w=majority'

export const connectDB = async () => {
    try {
        console.log('hola')
        await mongoose.connect(url)
        console.log('Se conecto con la base de datos')
    } catch (error) {
        console.log('Hubo un error: ', error)
    }
}
