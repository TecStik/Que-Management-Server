const mongoose = require("mongoose");
const { dbURI } = require("../core/index");
const { Schema } = mongoose;
/////////////////////////////////////////////////////////////////////////////////////////////////

// let dbURI = 'mongodb://localhost:27017/abc-database';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on("connected", function () {
  //connected
  console.log("Mongoose is connected");
});

mongoose.connection.on("disconnected", function () {
  //disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on("error", function (err) {
  //any error
  console.log("Mongoose connection error: ", err);
  process.exit(1);
});

process.on("SIGINT", function () {
  /////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log("Mongoose default connection closed");
    process.exit(0);
  });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////

let UserSchema = mongoose.Schema({
  Name: String,
  Email: String,
  ContactNum: String,
  LoginId: String,
  Password: String,
  CraetedBy: String,
  Role: String, // Admin User
});

let User = mongoose.model("Users", UserSchema);

// ==================>

let CompanySchema = mongoose.Schema({
  Name: String,
  RegId: String,
  Email: String,
  ContactNum: String,
  BelongTo: String, // admin ObjectId
  NumberOfFranchies: String,
});

let Company = mongoose.model("Companys", CompanySchema);

// ==================>

let VisitorSchema = mongoose.Schema({
  Name: String,
  Email: String,
  ContactNum: String,
});

let Visitor = mongoose.model("Visitors", VisitorSchema);

// ==================>

let FranchiseSchema = mongoose.Schema({

  Name: String,
  Address: String,
  ContactNum: String,
  ShortCode: String,
  BelongTo: String,
  TokenNumber: String,
  CurrentToken: String,
  StartTime: String,
  EndTime: String,
  Status: String,
  ActiveFranchiseId: String,
  ManagerObjId: String,
  ManagerName: String,
  //   AtmTime: String,
  //   CurrntTokenNumber: String,
  //   LastIssueNumber: String,
  //   Token: [{ type: mongoose.Schema.Types.ObjectId, ref: "Token" }],
});

let Franchise = mongoose.model("Franchise", FranchiseSchema);

// ==================>

let TokenSchema = mongoose.Schema({
  FranchiseId: String,
  TokenNumber: String,
  Name: String,
  ContactNum: String,
  VisitorObjId: String,
  IssueTime: String,
  AttendTime: String,
  Status:String
});

let Token = mongoose.model("Tokens", TokenSchema);

//  ==================>

module.exports = {
  User: User,
  Token: Token,
  Company: Company,
  Visitor: Visitor,
  Franchise: Franchise,
};
