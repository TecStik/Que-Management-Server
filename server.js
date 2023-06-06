const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
let authRoutes = require("./auth");
const app = express();

const { PORT } = require("./core/index");
const {
  User,
  Token,
  Company,
  Visitor,
  Franchise,
} = require("./dbmodule/module");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("short"));
app.use("/auth", authRoutes);
// =========================================================>

app.post("/api/rigester", (req, res, next) => {

  if (!req.body.ContactNum) {
    res.status(409).send(` Please send Franchise Name  in json body
    e.g:
    "Please Provaide Email & Contact Number":"demo@gmail.com & 03000000000",
`);
    return;
  } else {

    const newUser = new User({
      Name: req.body.Name,
      Email: req.body.Email,
      ContactNum: req.body.ContactNum,
      LoginId: req.body.LoginId,
      Password: req.body.Password,
      Role: "Admin" // Admin / User
    });

    newUser.save().then((data) => {
      res.send(data)
      companyFun(data)
    })
      .catch((err) => {
        res.status(500).send({ message: "an error occured :" + err });
      })
  }
});

// =========================================================>

app.post("/api/CraeteUser", (req, res, next) => {

  if (!req.body.ContactNum) {
    res.status(409).send(` Please send Franchise Name  in json body
    e.g:
    "Please Provaide Email & Contact Number":"demo@gmail.com & 03000000000",
`);
    return;
  } else {

    const newUser = new User({
      Name: req.body.Name,
      Email: req.body.Email,
      ContactNum: req.body.ContactNum,
      LoginId: req.body.LoginId,
      Password: req.body.Password,
      Role: req.body.Role // Admin / User
    });

    newUser.save().then((data) => {
      res.send(data)
    })
      .catch((err) => {
        res.status(500).send({ message: "an error occured :" + err });
      })
  }
});

// =========================================================>

app.post("/api/user/get", (req, res, next) => {
  console.log(req.body.filter);
  if (!req.body.filter) {
    res.status(409).send(`
        Please send filter in json body
        e.g:
        "filter":"{}",
    `);
  } else {
    User.find(req.body.filter, (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        res.status(500).send("error");
      }
    });
  }
});

// =========================================================>

function companyFun(data) {

  const newCompany = new Company({
    Name: data.Name,
    RegId: data.LoginId,
    Email: data.Email,
    ContactNum: data.ContactNum,
    BelongTo: data._id, // Admin Obj Id 
    NumberOfFranchies: 0
  });

  newCompany.save().then((data) => { console.log(data, "Company Data") })
    .catch((err) => {
      res.status(500).send({ message: "an error occured :" + err });
    })

}

// app.post("/api/company", (req, res, next) => {
//   if (!req.body.Email || !req.body.ContactNum || !req.body.BelongTo) {
//     res.status(409).send(` Please send Franchise Name  in json body
//       e.g:
//       "Please Provaide Email & Contact Number":"demo@gmail.com , BelongTo & 03000000000",
//   `);
//     return;
//   } else {

//     const newCompany = new Company({
//       Name: req.body.Name,
//       NTN: req.body.NTn,
//       Email: req.body.Email,
//       ContactNum: req.body.ContactNum,
//       BelongTo: req.body.BelongTo, // Admin Obj Id 
//       NumberOfFranchies: req.body.NumberOfFranchies
//     });

//     newCompany.save().then((data) => { res.send(data) })
//       .catch((err) => {
//         res.status(500).send({ message: "an error occured :" + err });
//       })
//   }
// });

// =========================================================>

app.post("/api/company/get", (req, res, next) => {
  if (!req.body.filter) {
    res.status(409).send(`
          Please send filter in json body
          e.g:
          "filter":"{}",
      `);
  } else {
    Company.find(req.body.filter, (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        res.status(500).send("error");
      }
    });
  }
});



// =========================================================>

app.post("/api/visitor", (req, res, next) => {
  if (!req.body.Email || !req.body.ContactNum) {
    res.status(409).send(` Please send Franchise Name  in json body
      e.g:
      "Please Provaide Email & Contact Number":"demo@gmail.com  & 03000000000",
  `);
    return;
  } else {

    const newvisitor = new Visitor({
      Name: req.body.Name,
      Email: req.body.Email,
      ContactNum: req.body.ContactNum
    });

    newvisitor.save().then((data) => { res.send(data) })
      .catch((err) => {
        res.status(500).send({ message: "an error occured :" + err });
      })
  }
});

// =========================================================>

app.post("/api/visitor/get", (req, res, next) => {
  if (!req.body.filter) {
    res.status(409).send(`
          Please send filter in json body
          e.g:
          "filter":"{}",
      `);
  } else {
    Visitor.find(req.body.filter, (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        res.status(500).send("error");
      }
    });
  }
});

// =========================================================>

app.post("/api/franchise", (req, res, next) => {
  if (!req.body.ContactNum) {
    res.status(409).send(` Please send Franchise Name  in json body
      e.g:
      "Please Provaide Email & Contact Number":"demo@gmail.com  & 03000000000",
  `);
    return;
  } else {

    const newfranchise = new Franchise({
      Name: req.body.Name,
      Address: req.body.Address,
      BelongTo: req.body.BelongTo,
      ShortCode: req.body.ShortCode,
      ContactNum: req.body.ContactNum,
      ActiveFranchiseId: req.body.ActiveFranchiseId,
      ManagerObjId: req.body.ManagerObjId,
      StartTime: req.body.StartTime,
      EndTime: req.body.EndTime,
      Status: req.body.Status,
      TokenNumber: 0,
      CurrentToken: 0,
    });

    newfranchise.save().then((data) => { res.send(data) })
      .catch((err) => {
        res.status(500).send({ message: "an error occured :" + err });
      })
  }
});


//---------------------update filtered franchise

app.post("/api/franchise/updateFiltered", (req, res, next) => {
  if (!req.body.filter || !req.body.Update) {
    res.status(409).send(`
          Please send filter in json body
          e.g:
          "filter":"{}",
      `);
  } else {
    Franchise.findOneAndUpdate(req.body.filter, req.body.Update, (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        res.status(500).send("error");
      }
    });
  }
});
//----------------
// =========================================================>

app.post("/api/franchise/get", (req, res, next) => {
  if (!req.body.filter) {
    res.status(409).send(`
          Please send filter in json body
          e.g:
          "filter":"{}",
      `);
  } else {
    Franchise.find(req.body.filter, (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        res.status(500).send("error");
      }
    });
  }
});

// =========================================================>


app.post("/api/token", (req, res, next) => {
  var newNumber = 0;

  if (!req.body.FranchiseId) {
    res.status(409).send(` Please send Franchise obj  in json body
    e.g:
    "Please Provaide Franchise Id",
`);
    return;
  } else {
    Franchise.findById({ _id: req.body.FranchiseId },
      (err, doc) => {
        if (!err) {
          newNumber = parseInt(doc.CurrntTokenNumber) + 1;
          doc.CurrntTokenNumber = newNumber;

          const newfranchise = new Franchise({
            TokenNumber: TokenNumber, //newNumber
            IssueTime: req.body.IssueTime,
            FranchiseId: req.body.FranchiseId,
            AttendedTime: req.body.AttendedTime,
          });

          //   newToken.save();
          //   doc.Token.push(newToken);
          //   doc.save();
          //   res.send(doc);

          newfranchise.save().then((data) => { res.send(data) }).catch((error) => {
            res.status(500).send({
              message: "an error occured : " + error,
            });
          });
        } else {
          res.status(409).send(err);
        }
      }
    );
  }
});



app.post("/api/token/get", (req, res, next) => {
  if (!req.body.filter) {
    res.status(409).send(`
        Please send filter in json body
        e.g:
        "filter":"{}",
    `);
  } else {
    Token.find(req.body.filter, (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        res.status(500).send("error");
      }
    });
  }
});

// =========================================================>

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});



// get All Data FranchiseObjectID in Token number

// app.post("/getTokenNumber", (req, res) => {
//   Token.find(
//     { FranchiseObjectID: req.body.FranchiseObjectID },

//     (err, data) => {
//       if (!err) {
//         res.send(data);
//       } else {
//         res.status(500).send("error");
//       }
//     }
//   );
// });

//delete  Api with Token

// app.delete("/tokenData/:id", (req, res, next) => {
//   Token.findByIdAndRemove({ _id: req.params.id }, (err, doc) => {
//     if (!err) {
//       res.send("Token hase been deleted");
//     } else {
//       res.status(500).send("error happened");
//     }
//   });
// });

