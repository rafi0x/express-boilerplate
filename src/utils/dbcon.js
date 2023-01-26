import mongoose from 'mongoose';

export const mongoConnect = (uri) => {
    
    
    mongoose.connect(uri,
        {
            useNewUrlParser:true, 
            useUnifiedTopology:true,
        })
        .then(()=> console.log(`${new Date().toISOString()} [info] Connected to DB @ ${uri}`))
        .catch((e) => {
        
        console.log(e);
        setTimeout(mongoConnect, 5000);
    });
};