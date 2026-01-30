import ApplicationItem from "./ApplicationItem";

export default function ApplicationList ({ applications, onDelete, onEdit}){
    return (
        <div className="flex flex-col gap-4">
            {applications.length === 0 ? (
                <p className="text-lg font-bold mb-2">No applications found.</p>
            ) : (
                applications.map((app) => (
          <ApplicationItem
            key={app.id}
            app={app}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
            )
        
        }

        </div>
    )
}