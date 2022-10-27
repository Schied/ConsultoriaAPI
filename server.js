const keys = require('./src/utils/keys')
const app = require('./src/app');

app.listen(keys.PORT, (error)=>{
    if (error) throw error;
    console.log('Servidor corriendo');
});