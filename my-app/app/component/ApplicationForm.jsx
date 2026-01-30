export default function ApplicationForm({ handleSubmit, companyName, setCompanyName, position, setPosition, 
  status, setStatus, date, setDate, notes, setNotes, isEditing  }){
    return (
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
            className={`${isEditing ? 'bg-yellow-600' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-6 rounded transition-colors`}
        type="submit"
          >
             {isEditing ? "Update Application" : "Submit"}
          </button>


        </form>
    )
  }