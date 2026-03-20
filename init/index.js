const mongoose = require("mongoose");
const MONGO_URL = 'mongodb://127.0.0.1:27017/event';
const initData = require("./data.js");
const Event = require("../models/event.js");

main()
.then(()=>{
    console.log("DataBase Connection Done")
})
.catch((err) =>{
    console.log("Somthing error in DataBase");
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async() =>{
    await Event.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj, owner: "69b8e20709f3e57531d84317",
    }));
    await Event.insertMany(initData.data);
    console.log("Data Inizialization Successfully");
}

initDB();
