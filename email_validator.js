const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
// ----------------bcrypt saltRounds-------------
const saltRounds = 12
// -----------------Mongoose connection----------
mongoose.connect('mongodb://localhost:27017/formdata', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('we are connected mongoDB');
});



const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    dateOfBirth: String,

});




// ------------------hash password --------------
formSchema.pre('save',async function(next){
    
    if(this.isModified("password")){
        this.password =await bcryptjs.hash(this.password,saltRounds,)
    }
    next()
    console.log(this.password)
})



//--------------------compiling schema to model-------------
const FORMDATA = mongoose.model('FORMDATA', formSchema);
//-------------------------Set Scheme End--------------------




// ------------------------Validate Dublicate Email Class----------------
class f {
    constructor(user) {
        this.email = user.email;
        this.user = user

    }
    check() {
        return new Promise(async (resolve, reject) => {
            const emailCount = await mongoose.model("FORMDATA").find({ email: this.email }, { email: 1 });
            const dublicaleEmail = await emailCount[0]
            console.log(emailCount);
            const document  = this.user

            if (dublicaleEmail === undefined) {
                document.save((error, document)=>{
                    if (error) return console.error(error);
                  })
                resolve('save')
            } else {
                reject('not save')
            }

        })
    }
}






// const obj = {
//     name:"rahul khan",
//     email:"masuk@gmail.com",
//     password:"test@123",
//     gender:"male",
//     dateOfBirth: "01-01-2001"
    
// }

// const user = new FORMDATA(obj)
// const docs = new f(user)


// docs.check().then((rs)=>{
// console.log(rs);
// })
// .catch((rj)=>{
//     console.log(rj);
// })







module.exports = {
    customValidate: f,
    compiler: FORMDATA,

}





// ---------------------Save Document in MongoDB Class -----------------
class Save_My_Docs {
    constructor(doc) {
        this.document = doc
    }
    saveDocs() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                  const document = this.document
                  document.save((error, document)=>{
                    if(!error){
                        resolve('document has been save')
                    }else{
                        reject('document has not save')
                    }
                  })
                  
                
            }, 3000);
        })
    }

}