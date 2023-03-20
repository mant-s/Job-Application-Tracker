import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

function NewApplication(props) {
  const [application, setApplication] = useState({
    company: "",
    jobTitle: "",
    dateApplied: "new Date()",
    jobDescription: "",
    replied: false,
    interviewRound: 0,
    rejected: false,
    accepted: false,
  });

  function handleNewInput(e) {
    const { name } = e.target;
    let result;
    if (name === "replied" || name === "accepted" || name === "rejected") {
      result = e.target.checked;
    } else {
      result = e.target.value;
    }

    setApplication((prevVal) => {
      return {
        ...prevVal,
        [name]: result,
      };
    });
  }

  return (
    <div>
      <form>
        <input
          name="company"
          placeholder="Company Name"
          value={application.company}
          onChange={(e) => handleNewInput(e)}
        />

        <input
          name="jobTitle"
          placeholder="Job Title"
          value={application.jobTitle}
          onChange={(e) => handleNewInput(e)}
        />

        <div className="appliedDate formDiv">
          <label htmlFor="dateApplied">Date Applied</label>
          <input
            name="dateApplied"
            type={"date"}
            onChange={(e) => handleNewInput(e)}
          />
        </div>

        <input
          name="jobDescription"
          placeholder="Job Description"
          value={application.jobDescription}
          onChange={(e) => handleNewInput(e)}
        />

        <div className="checkboxDiv formDiv">
          <input
            name="replied"
            className="checkboxes"
            type={"checkbox"}
            onChange={(e) => handleNewInput(e)}
          />
          <label htmlFor="replied" className="checkboxes">
            Replied
          </label>
        </div>

        <label htmlFor="interviewRound">Interview Round</label>
        <input
          name="interviewRound"
          type={"number"}
          value={application.interviewRound}
          onChange={(e) => handleNewInput(e)}
        />

        <div>
          <input
            name="rejected"
            className="checkboxes"
            type={"checkbox"}
            onChange={(e) => handleNewInput(e)}
          />
          <label htmlFor="rejected" className="checkboxes">
            Rejected
          </label>
        </div>

        <input
          name="accepted"
          className="checkboxes"
          type={"checkbox"}
          onChange={(e) => handleNewInput(e)}
        />
        <label htmlFor="accepted" className="checkboxes">
          Accepted
        </label>

        <button
          type="submit"
          onClick={(e) => {
            props.applicationHandler(e, application);
          }}
        >
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default NewApplication;
