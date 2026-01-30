"use client";
import React, { useState, useEffect, use } from "react";
export default function HomePage() {
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("applied"); // Default to "applied"
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [editingApplicationId, setEditingApplicationId] = useState(null);
  const [applications, setApplications] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("job-apps");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("job-apps", JSON.stringify(applications));
  }, [applications]);

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

    if (editingApplicationId) {
      const updateList = applications.map((app) =>
        app.id === editingApplicationId ? applicationData : app,
      );
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
      (application) => application.id !== id,
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
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Job Application Tracker</h1>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="space-y-1">
            <label htmlFor="companyname">Company Name: </label>
            <input
              type="text"
              placeholder="Company Name..."
              id="companyname"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              placeholder="Position"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="rejected"> Rejected</option>
            <option value="offer">Offer</option>
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="date">Date Applied:</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-1 mb-4">
            <label htmlFor="notes">Notes:</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2"
              id="notes"
              placeholder="Notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      {/* <ul>
        {applications.map((app) => (
          <li key={app.id}>
            {app.company} - {app.position} ({app.status})
          </li>
        ))}
      </ul> */}
      <hr className="my-8" />{" "}
      {/* A simple line to separate the form from the list */}
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      <div className="flex flex-col gap-2">
        {applications.map((app) => (
          <div
            key={app.id}
            className="border border-gray-300 rounded-md p-4 bg-white"
          >
            <h3 className="text-lg font-bold mb-2">{app.company}</h3>
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
            <button
              onClick={() => handleDelete(app.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-3 mb-3 mt-3"
            >
              Delete
            </button>
            <button
              onClick={() => handleEditClick(app)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
