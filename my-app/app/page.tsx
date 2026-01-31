"use client";
import React, { useState, useEffect, use } from "react";
export default function HomePage() {
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (app) => {
    app.preventDefault();

    const newApplication = {
      id: crypto.randomUUID(),
      jobTitle: jobTitle,
      company: company,
      date: date,
    };
    setApplications([...applications, newApplication]);
    setJobTitle("");
    setCompany("");
    setDate("");

    console.log("Application Added:", newApplication);
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
          <input type="text" name="jobTitle" className="p-2 border rounded" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
          <br />
          <label>Company:</label>
          <input type="text" name="company" className="p-2 border rounded" value={company} onChange={e => setCompany(e.target.value)} />
          <br />
          <label>Date:</label>
          <input type="date" name="date" className="p-2 border rounded" value={date} onChange={e => setDate(e.target.value)} />
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Application
          </button>
        </form>
      </div>
    </main>
  );
}
