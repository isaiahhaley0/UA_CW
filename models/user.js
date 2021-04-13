const mongoose = require("mongoose"),
{Schema} = require("mongoose"),
Subscriber = require("./subscriber");
const subscriber = require("./subscriber");
userSchema = new Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        zipCode:{
            type: Number,
            min: [10000,"zip code too short"],
            max: [99999]
        },
        password:{
            type: String,
            required: true
        },
        courses: [{type: Schema.Types.ObjectId, ref: Course}],
        subscribedAccount: {type: Schema.Types.ObjectId, ref: Subscriber}
    },
    {
        timestaps: true
    }
)

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`
});

userSchema.pre("save", function (){
    let user = this;
    if(user.subscribedAccount == undefined){
        Subscriber.findOne({
            email: user.email
        })
        .then(subscriber =>{
            user.subscribedAccount = subscriber;
            next();
        })
        .catch(error =>{
            console.log(`Error associating subscriber: ${error.message}`)
        })
    }
    else{
        next();
    }
})

module.exports = mongoose.model("User", userSchema);