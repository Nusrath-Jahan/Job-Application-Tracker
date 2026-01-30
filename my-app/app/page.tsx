"use client";
import React, { useState, useEffect, use } from "react";
import ApplicationForm from "@/app/component/ApplicationForm";
import ApplicationList from "@/app/component/ApplicationList";

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
        <ApplicationForm
          handleSubmit={handleSubmit}
          companyName={companyName}
          setCompanyName={setCompanyName}
          position={position}
          setPosition={setPosition}
          status={status}
          setStatus={setStatus}
          date={date}
          setDate={setDate}
          notes={notes}
          setNotes={setNotes}
          isEditing={!!editingApplicationId}
        />
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
        <ApplicationList
          applications={applications}
          onDelete={handleDelete}
          onEdit={handleEditClick}
        />
      </div>
    </main>
  );
}
