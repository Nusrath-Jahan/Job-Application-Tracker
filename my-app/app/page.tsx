"use client";
import React, { useState } from "react";
export default function HomePage() {
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("applied"); // Default to "applied"
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [applications, setApplications] = useState([]);
const [editingApplicationId, setEditingApplicationId] = useState(null)


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // const newApplication = {
    //   id: crypto.randomUUID(), 
    //   company: companyName,
    //   position: position,
    //   status: status,
    //   date: date,
    //   notes: notes,
    // };

    //  setApplications([...applications, newApplication]);

const applicationData = {
  id: editingApplicationId ? editingApplicationId : crypto.randomUUID(),
  company: companyName,
  position: position,
  status: status,
  date: date,
  notes: notes,
};

if (editingApplicationId){
  const updateList = applications.map( app => app.id === editingApplicationId ? applicationData : app);
  setApplications(updateList);
} else {
  setApplications([...applications, applicationData]);
}

   

    // Clear form fields after submission
    setCompanyName("");
    setPosition("");
    setStatus("applied");
    setDate("");
    setNotes("");
  };

  const handleDelete = (id) => {
    const updatedApplications = applications.filter(
      (application) => application.id !== id
    );
    setApplications(updatedApplications);
  };

  const handleEditClick = (app) => {
    setEditingApplicationId(app.id); // Tell the app: "We are now editing this specific ID"

    // Fill the form fields with existing data
    setCompanyName(app.company);
    setPosition(app.position);
    setStatus(app.status);
    setDate(app.date);
    setNotes(app.notes);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1>Job Application Tracker</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="companyname">Company Name: </label>
            <input
              type="text"
              placeholder="Company Name..."
              id="companyname"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              placeholder="Position"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="rejected"> Rejected</option>
            </select>
          </div>
          <div>
            <label htmlFor="date">Date Applied:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              placeholder="Notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      {/* <ul>
        {applications.map((app) => (
          <li key={app.id}>
            {app.company} - {app.position} ({app.status})
          </li>
        ))}
      </ul> */}
      <hr /> {/* A simple line to separate the form from the list */}
      <h2>My Applications</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {applications.map((app) => (
          <div
            key={app.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{app.company}</h3>
            <p>
              <strong>Position: </strong>
              {app.position}
            </p>
            <p>
              <strong>Status: </strong>
              {app.status}
            </p>
            <p>
              <strong>Date: </strong>
              {app.date}
            </p>
            <p>
              <strong>Notes: </strong>
              {app.notes}
            </p>
           

            {/* <button onClick={() => setApplications(applications.filter( a => a.id !== app.id))}>Delete</button> */}
          <button onClick={() => handleDelete(app.id)}>Delete</button>
          <button onClick={() => handleEditClick(app)}>Edit</button>
          </div>
        ))}
      </div>
    </main>
  );
}
