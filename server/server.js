require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
// const cors = require("cors");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(cors());

mongoose.set("strictQuery", false);
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const PORT = process.env.PORT || 8000;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUri + dbName);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Creating a Schema
const jobApplicationsSchema = new mongoose.Schema({
  company: String,
  jobTitle: String,
  dateApplied: Date,
  jobDescription: String,
  replied: Boolean,
  interviewRound: Number,
  rejected: Boolean,
  accepted: Boolean,
});

// Compiling Schema into a model
const JobApplication = mongoose.model("JobApplication", jobApplicationsSchema);

// Creating first example item
// const dateToday = new Date();
// console.log(dateToday);

// JobApplication.deleteOne({ company: "Enter the company here" });

// Saving the first example item

// Creating Routes
// Route for getting all values in db
app.get("/api/job-applications", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  JobApplication.find({}).then((docs) => {
    res.json(docs);
  });
  // res.send("Hello World!");
});

// Route for adding applications to db
app.post("/api/new-job-application", (req, res) => {
  res.json(req.body);
  // Processing boolean values
  const replied = req.body.replied === true;
  const rejected = req.body.rejected === true;
  const accepted = req.body.accepted === true;

  // Creating application
  const jobApplication = new JobApplication({
    company: req.body.company,
    jobTitle: req.body.jobTitle,
    dateApplied: req.body.dateApplied,
    jobDescription: req.body.jobDescription,
    replied: replied,
    interviewRound: Number(req.body.interviewRound),
    rejected: rejected,
    accepted: accepted,
  });

  // console.log(jobApplication);

  // Saving application
  jobApplication.save();
});

// Route for deleting applications in db
app.delete("/api/delete-job-application", (req, res) => {
  const {
    company,
    jobTitle,
    dateApplied,
    jobDescription,
    replied,
    interviewRound,
    rejected,
    accepted,
  } = req.body.application;

  JobApplication.findOneAndDelete({
    $and: [
      { company: company },
      { jobTitle: jobTitle },
      { dateApplied: dateApplied },
      { jobDescription: jobDescription },
      { replied: replied },
      { interviewRound: interviewRound },
      { rejected: rejected },
      { accepted: accepted },
    ],
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Route for editing applications in db
app.put("/api/update-job-application", (req, res) => {
  const oldApplication = req.body.oldApplication;
  const updatedApplication = req.body.updatedApplication;

  const filter = {
    $and: [
      { company: oldApplication.company },
      { jobTitle: oldApplication.jobTitle },
      { dateApplied: oldApplication.dateApplied },
      { jobDescription: oldApplication.jobDescription },
      { replied: oldApplication.replied },
      { interviewRound: oldApplication.interviewRound },
      { rejected: oldApplication.rejected },
      { accepted: oldApplication.accepted },
    ],
  };

  const replacement = {
    company: updatedApplication.company,
    jobTitle: updatedApplication.jobTitle,
    dateApplied: updatedApplication.dateApplied,
    jobDescription: updatedApplication.jobDescription,
    replied: updatedApplication.replied,
    interviewRound: updatedApplication.interviewRound,
    rejected: updatedApplication.rejected,
    accepted: updatedApplication.accepted,
  };

  JobApplication.replaceOne(filter, replacement)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

connectDB().then(() => {
  app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });
});
