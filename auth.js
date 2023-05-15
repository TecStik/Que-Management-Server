const express = require("express");
const {
  User,
  Token,
  Company,
  Visitor,
  Franchise,
} = require("./dbmodule/module");
let app = express.Router();

app.post("/api/userLogin", (req, res, next) => {
  // console.log(req.body.Email);
  if (!req.body.Email || !req.body.Password) {
    res.status(403).send(
      `please send email and passwod in json body.
            e.g:
             {
            "email": "myMail@gmail.com",
            "password": "abc",
         }`
    );
    return;
  }
  User.find({ Email: req.body.Email }, function (err, doc) {
    // console.log(doc);
    if (!err) {
      if (req.body.password === doc.Password) {
        res.send(doc);
      }
    } else {
      res.status(403).send({
        message: "Empolyee not found",
      });
    }
  });
});

// Create Empolyee

// app.post("/employe", (req, res, next) => {
//   if (!req.body.email || !req.body.password) {
//   } else {
//     employee.findOne({ employeeEmail: req.body.email }, (err, doc) => {
//       if (!err && !doc) {
//         let employ = new employee({
//           employeeName: req.body.name,
//           employeeEmail: req.body.email,
//           companyName: req.body.companyName,
//           shortCode: req.body.shortCode,
//           employeePassword: req.body.password,
//           createdBy: req.body.createdBy,
//           Role: req.body.Role,
//         });
//         employ.save((err, doc) => {
//           if (!err) {
//             if (doc.Role.toLowerCase() == "admin") {
//               let newQuota = new quota({
//                 Limit: 5,
//                 Utilized: 0,
//                 BelongsTo: doc._id,
//               });
//               newQuota.save((err, qta) => {
//                 console.log("Employee with quota", doc, qta);
//                 res.send({ message: "Admin  created", data: { doc, qta } });
//               });
//             } else {
//               res.send({ message: "Member  created", doc });
//             }

//             // req.body.employeeNumber ? emailSnd(doc) : emailSnd(doc);
//             // emailSnd(doc);
//             /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)
//               ? emailSnd(doc)
//               : smsSnd(doc);
//           } else {
//             res.status(500).send("Error in creating Employee, " + err);
//           }
//         });
//       } else {
//         res.status(409).send({
//           // message: `Your ${doc.employeeName} account has been created on KollectIt as role ${doc.Role}`,
//           message: "Employee  alredy exist",
//         });
//       }
//     });
//   }
// });

// =======================export
module.exports = app;
