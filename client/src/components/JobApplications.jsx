import React, { useState } from "react";
import { Done, Clear, Delete, Edit } from "@mui/icons-material";

function JobApplications(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [company, setCompany] = useState(props.company);
  const [jobTitle, setJobTitle] = useState(props.jobTitle);
  const [dateApplied, setDateApplied] = useState(props.dateApplied);
  const [jobDescription, setJobDescription] = useState(props.jobDescription);
  const [replied, setReplied] = useState(props.replied);
  const [interviewRound, setInterviewRound] = useState(props.interviewRound);
  const [rejected, setRejected] = useState(props.rejected);
  const [accepted, setAccepted] = useState(props.accepted);

  function handleSubmit(e) {
    e.preventDefault();

    const oldApplication = {
      company: props.company,
      jobTitle: props.jobTitle,
      dateApplied: props.dateApplied,
      jobDescription: props.jobDescription,
      replied: props.replied,
      interviewRound: props.interviewRound,
      rejected: props.rejected,
      accepted: props.accepted,
    };

    const updatedApplication = {
      company: company,
      jobTitle: jobTitle,
      dateApplied: dateApplied,
      jobDescription: jobDescription,
      replied: replied,
      interviewRound: interviewRound,
      rejected: rejected,
      accepted: accepted,
    };

    props.updateApplication(oldApplication, updatedApplication, props.id);
    setIsEditing(false);
  }

  const applicationDate = new Date(props.dateApplied);

  var day = applicationDate.getDate();
  var month = applicationDate.getMonth() + 1;
  var year = applicationDate.getFullYear();

  const application = {
    company: props.company,
    jobTitle: props.jobTitle,
    dateApplied: props.dateApplied,
    jobDescription: props.jobDescription,
    replied: props.replied,
    interviewRound: props.interviewRound,
    rejected: props.rejected,
    accepted: props.accepted,
  };

  return (
    <div className="application">
      <h1>
        {isEditing ? (
          <>
            <label htmlFor="company">Company name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </>
        ) : (
          company
        )}
      </h1>
      <h1>
        {isEditing ? (
          <>
            <label htmlFor="jobTitle">Job title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </>
        ) : (
          jobTitle
        )}
      </h1>
      <p>{`Application Date: ${day}/${month}/${year}`}</p>
      <button
        className="expanded-button"
        hidden={isExpanded}
        onClick={(e) => {
          setIsExpanded(true);
        }}
      >
        Read More
      </button>
      {isExpanded && (
        <>
          <p>
            {isEditing ? (
              <>
                <label htmlFor="jobDescription">Job description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </>
            ) : (
              `Job Description:\n${props.jobDescription}`
            )}
          </p>

          <p>
            {isEditing ? (
              <>
                <input
                  type="checkbox"
                  checked={replied}
                  onChange={(e) => setReplied(e.target.checked)}
                />{" "}
                <label htmlFor="replied" className="checkboxes">
                  Replied
                </label>
              </>
            ) : props.replied ? (
              "Replied: Yes"
            ) : (
              "Replied: No"
            )}
          </p>
          <p>
            {isEditing ? (
              <>
                <label htmlFor="interviewRound">Interview round</label>
                <input
                  type="number"
                  value={interviewRound}
                  onChange={(e) => setInterviewRound(e.target.value)}
                />
              </>
            ) : (
              `Interview Round: ${props.interviewRound}`
            )}
          </p>
          <p>
            {isEditing ? (
              <>
                <input
                  type="checkbox"
                  checked={rejected}
                  onChange={(e) => setRejected(e.target.checked)}
                />{" "}
                <label htmlFor="rejected" className="checkboxes">
                  Rejected
                </label>
              </>
            ) : props.rejected ? (
              "Rejected: Yes"
            ) : (
              "Rejected: No"
            )}
          </p>
          <p>
            {isEditing ? (
              <>
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />{" "}
                <label htmlFor="accepted" className="checkboxes">
                  Accepted
                </label>
              </>
            ) : props.accepted ? (
              "Accepted: Yes"
            ) : (
              "Accepted: No"
            )}
          </p>
        </>
      )}
      <button
        className="expanded-button"
        hidden={!isExpanded}
        onClick={(e) => {
          e.preventDefault();
          setIsExpanded(false);
        }}
      >
        Read Less
      </button>
      <button
        type="submit"
        hidden={isEditing}
        onClick={(e) => {
          props.deleteApplication(e, application, props.id);
        }}
      >
        <Delete />
      </button>
      <button
        hidden={isEditing}
        onClick={() => {
          setIsExpanded(true);
          setIsEditing(true);
        }}
      >
        <Edit />
      </button>
      <button
        hidden={!isEditing}
        onClick={() => {
          setIsEditing(false);
        }}
      >
        <Clear />
      </button>
      <button hidden={!isEditing} onClick={(e) => handleSubmit(e)}>
        <Done />
      </button>
    </div>
  );
}

export default JobApplications;
