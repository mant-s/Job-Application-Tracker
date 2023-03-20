import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import NewApplication from "./NewApplication";
import JobApplications from "./JobApplications";

function App() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get("/api/job-applications")
      .then((res) => {
        // console.log(res.data);
        setApplications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function ApplicationHandler(e, newApplication) {
    setApplications((prevApplications) => {
      return [...prevApplications, newApplication];
    });
    axios
      .post("/api/new-job-application", newApplication)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    e.preventDefault();
  }

  function deleteApplication(e, application, id) {
    setApplications((prevVal) => {
      return prevVal.filter((val, ind) => {
        return id !== ind;
      });
    });

    // Checking if application is coming through accurately
    // console.log(application);

    axios
      .delete("/api/delete-job-application", { data: { application } })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    e.preventDefault();
  }

  function updateApplication(oldApplication, updatedApplication, id) {
    setApplications((prevVal) => {
      return prevVal.map((val, ind) => {
        if (ind === id) {
          return updatedApplication;
        } else {
          return val;
        }
      });
    });

    axios
      .put("/api/update-job-application", {
        oldApplication,
        updatedApplication,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <div className="App">
      <Header />
      <NewApplication applicationHandler={ApplicationHandler} />
      <div className="applications-area">
        {applications.map((application, ind) => {
          return (
            <JobApplications
              key={ind}
              id={ind}
              company={application.company}
              jobTitle={application.jobTitle}
              dateApplied={application.dateApplied}
              jobDescription={application.jobDescription}
              replied={application.replied}
              interviewRound={application.interviewRound}
              rejected={application.rejected}
              accepted={application.accepted}
              deleteApplication={deleteApplication}
              updateApplication={updateApplication}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
