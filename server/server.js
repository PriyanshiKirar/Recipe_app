import app from './src/app.js';
import config from './src/config/config.js'
import http from 'http';
import connecToDb from './src/db/db.js'
connecToDb();
const server=http.createServer(app);
const PORT=config.PORT;

server.listen(PORT,()=>{
    console.log(`server is working on ${PORT}`);
    
})
