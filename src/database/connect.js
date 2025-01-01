const mongoose = require('mongoose');
require('dotenv').config({ path: './src/environments/base.env' });


module.exports = function db_connect() {

try {
mongoose.connect(`mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.hmxntqd.mongodb.net/ia?retryWrites=true&w=majority&appName=Cluster0`)
return { connection_status: true }
} 
catch {
return { connection_status: false }
}
}