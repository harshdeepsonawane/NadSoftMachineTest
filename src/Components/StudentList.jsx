import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../api";
import Swal from "sweetalert2";

function StudentList({ onEdit, onView }) {
  const [students, setStudents] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchStudents = async () => {
    const res = await getStudents(page, limit);
    setStudents(res.data.students);
    setMetadata(res.data.metadata);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This student will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await deleteStudent(id);
      Swal.fire("Deleted!", "Student has been deleted.", "success");
      fetchStudents();
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  return (
    <div>
      <h3 className="mt-4">Student List</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={student.student_id}>
              <td>{idx + 1 + (page - 1) * limit}</td>
              <td>
                {student.first_name} {student.last_name}
              </td>
              <td>{student.email}</td>
              <td>
                <button
                  className="btn btn-sm btn-info me-1"
                  onClick={() => onView(student.student_id)}
                >
                  View
                </button>
                <button
                  className="btn btn-sm btn-warning me-1"
                  onClick={() => onEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(student.student_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {metadata.totalPages || 1}
        </span>
        <button
          className="btn btn-secondary"
          disabled={page >= metadata.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StudentList;
