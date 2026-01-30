export default function ApplicationItem({ app, onDelete, onEdit}) {

    return (
        <div className="flex flex-col gap-4">
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
              onClick={() => onDelete(app.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-3 mb-3 mt-3"
            >
              Delete
            </button>
            <button
              onClick={() => onEdit(app)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            </div>
    )
}