const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");
const Status = require("../models/Status");
const User = require("../models/User");
const bcrypt = require("bcryptjs");  //is used for hashing/encrypting password.

let instance = null;

class createServices {

  constructor() {}
  
  static getInstance() {
    if (!instance) {
      instance = new createServices();
    }
    return instance;
  }

  
  async createSampleUser() {
    //Hash Password
    const salt = await bcrypt.genSalt(10); //generate hash of level 10 complexity or its no of hashing rounds
    const hashedPassword = await bcrypt.hash( "password@1", salt ); 
  
    const sampleRecord = new User({
      name: "user",
      email: "user@SampleApp.com",
      password: hashedPassword,
      isPublished: true,
    });

    //check if email is already in DB i.e should be unique
    const emailExist = await User.findOne( { email: sampleRecord.email } );
    if(!emailExist)
    {  
        try {
          const result = await sampleRecord.save();
          console.log("Your Database is created with a Sample User.");
          console.log(result);
        }
        catch (ex) {
          for (property in ex.errors) {
            console.log(ex.errors[property]);
          }
        }
    } 
  }

  async createSampleRecord() {
    const sampleProduct = new Product({
      Name: "sampleName",
      Price: 0,
      Quantity: 0,
      Categorys: [{
        Id: "sampleId",
        Name: "sampleName"
      }],
    });

    const sampleCategory = new Category({
      Name: "sampleName",
      Type: "sampleType",
    });

    const sampleOrder = new Order({
      OrderName: "sampleOrderName",
      OrderDate: "1111-11-11T11:11:11.111+11:11",
      Comments: "sampleComments",
      Email: "sampleEmail",
      Password: "samplePassword",
      Phone: 0,
      User: {
        Id: "sampleId",
        name: "samplename"
      },
      Status: {
        Id: "sampleId",
        Name: "sampleName"
      },
      Products: [{
        Id: "sampleId",
        Name: "sampleName"
      }],
    });

    const sampleStatus = new Status({
      Name: "sampleName",
    });

    try {
      const resultProduct = await sampleProduct.save();
      const resultCategory = await sampleCategory.save();
      const resultOrder = await sampleOrder.save();
      const resultStatus = await sampleStatus.save();
      console.log("Your Database is created with a Sample Record");
    }
    catch (ex) {
      for (property in ex.errors) {
      console.log(ex.errors[property]);
      }
    }
  }

}

module.exports = createServices;
