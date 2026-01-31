"use client";
import React, { useState, useEffect, use } from "react";
export default function HomePage() {
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [isEditing, setIsEditing] = useState(null);

  const handleSubmit = (app) => {
    app.preventDefault();

    const newApplication = {
      id: isEditing ? isEditing : crypto.randomUUID(),
      jobTitle: jobTitle,
      company: company,
      date: date,
    };
    if (isEditing) {
      const updateList = applications.map((app) =>
        app.id === isEditing ? newApplication : app,
      );
      setApplications(updateList);
    } else {
      setApplications([...applications, newApplication]);
    }

    setJobTitle("");
    setCompany("");
    setDate("");
    

    console.log("Application Added:", newApplication);
  };

  const handleDelete = (id) => {
    const updatedApplications = applications.filter((app) => app.id !== id);
    setApplications(updatedApplications);
  };
  const handleEdit = (app) => {
    setIsEditing(app.id);
    setCompany(app.company);
    setJobTitle(app.jobTitle);
    setDate(app.date);
  };

  return (
    <main>
      <div className="mt-8 flex justify-center text-3xl font-bold underline ">
        Job Application Tracker
      </div>
      <div className="mt-8 mx-auto max-w-md p-4 border rounded shadow">
        <h2 className="text-2xl font-bold">New Job Application</h2>
        <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            className="p-2 border rounded"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <br />
          <label>Company:</label>
          <input
            type="text"
            name="company"
            className="p-2 border rounded"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <br />
          <label>Date:</label>
          <input
            type="date"
            name="date"
            className="p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Application
          </button>
        </form>
      </div>

      <hr className="mt-8" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Job Application List</h2>
        <div>
          {applications.map((app) => (
            <div key={app.id}>
              <h4>
                {app.jobTitle} at {app.company} on {app.date}
              </h4>
              <button onClick={() => handleDelete(app.id)}>Delete</button>
              <button onClick={() => handleEdit(app)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
