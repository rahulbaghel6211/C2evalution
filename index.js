const express=require("express");
const mongoose=require("mongoose");

const app=express();
const connect=()=>{
    return mongoose.connect("mongodb+srv://Rahulbaghel:Rahul@8956@cluster0.ljuvz.mongodb.net/web15-atlas?retryWrites=true&w=majority");

};

const userSchema=new mongoose.Schema(
    {
        firstName:{type:String,required:true},
        middleName:{type:String,required:false},
        lastName:{type:String,required:true},
        age:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        address:{type:String,required:true},
        gender:{type:String,required:true},

        userId:{
            createdAt:{required:true, type:mongoose.Schema.Types.ObjectId},
            updatedAt:{required:true, type:mongoose.Schema.Types.ObjectId},
        }
    }
);
const user=mongoose.model("user",userSchema);


const BranchDetailSchema=new mongoose.Schema(
    {
name:{type:String,required:ture},
address:{type:String,required:ture},
IFSC: {required:true,type:String},
MICR:{required:true, type:Number},

    },
    {
        createdAt:{required:true,
           ref: "user",
           type:mongoose.Schema.Types.ObjectId},
       updatedAt:{required:true,
           ref: "user",
           type:mongoose.Schema.Types.ObjectId
           }, 
        }   
);
const BranchDetail=mongoose.model("BranchDetail",BranchDetailSchema);

const MasterAccountSchema=new mongoose.Schema(
    {
        balance:{type:Number,required:true}
    },
    {
 createdAt:{required:true,
    ref: "user",
    type:mongoose.Schema.Types.ObjectId},
updatedAt:{required:true,
    ref: "user",
    type:mongoose.Schema.Types.ObjectId
    },

    }
)
const MasterAccount=mongoose.model("MasterAccount",MasterAccountSchema);


const SavingsAccountSchema=new mongoose.Schema(
    {
        account_number:{type:Number,required:true,unique:true}
    },
    {
        balance:{type:mongoose.Schema.Types.ObjectId,
            ref:"MasterAccount",
            required:true},
        interestRate:{type:Number,required:true}
    },
    {
 createdAt:{required:true,
    ref: "user",
    type:mongoose.Schema.Types.ObjectId},
updatedAt:{required:true,
    ref: "user",
    type:mongoose.Schema.Types.ObjectId
    },

    }
)
const SavingsAccount=mongoose.model("SavingsAccount",SavingsAccountSchema);
const FixedAccountSchema=new mongoose.Schema(
    {
        account_number:{type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SavingsAccount",
            unique:true}
    },
    {
        startDate:{
            required:true,
            type:Date,
        },
        maturityDate:{
            required:true,
            type:Date,
        }

    },
    {
        balance:{type:mongoose.Schema.Types.ObjectId,
            ref:"MasterAccount",
            required:true},
        interestRate:{type:mongoose.Schema.Types.ObjectId,
           ref:"SavingsAccount" ,
            required:true}
    },
    {
 createdAt:{required:true,
    ref: "user",
    type:mongoose.Schema.Types.ObjectId},
updatedAt:{required:true,
    ref: "user",
    type:mongoose.Schema.Types.ObjectId
    },

    }
)
const FixedAccount=mongoose.model("FixedAccount",FixedAccountSchema);

app.get("/MasterAccount",async(req,res)=>{
    try {
        const user=await user.findById(req.params.id).lean().exce();

        return res.status(100).send(user);
        
    } catch (error) {
        return res.status(200).send({message:error.message});
    }
});

app.post("/SavingsAccount",async(req,res)=>{
    try {
        const user=await user.create(req.balance).lean().exce();

        return res.status(100).send(user);
        
    } catch (error) {
        return res.status(200).send({message:error.message});
    }
});
app.post("/FixedAccount",async(req,res)=>{
    try {
        const user=await user.create(req.account_number).lean().exce();

        return res.status(100).send(user);
        
    } catch (error) {
        return res.status(200).send({message:error.message});
    }
});
app.delete("/FixedAccount",async(req,res)=>{
    try {
        const user=await user.findByIdAndDelete(req.params.id).lean().exce();

        return res.status(100).send(user);
        
    } catch (error) {
        return res.status(200).send({message:error.message});
    }
});





app.listen(4525,async()=>{
    try {
        await connect();
        
    } catch (error) {
        console.log(error);
        
    }
    console.log("listening on port 4525 ")
});