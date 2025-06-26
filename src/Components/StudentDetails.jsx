import { useEffect, useState } from "react";
import { getStudent } from "../api";

function StudentDetails({ studentId, onClose }) {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (studentId) {
      getStudent(studentId).then((res) => setStudent(res.data));
    }
  }, [studentId]);

  if (!student) return null;

  return (
    <div className="card p-3 mb-3">
      <h4>Student Details</h4>
      <p>
        <strong>Name:</strong> {student.first_name} {student.last_name}
      </p>
      <p>
        <strong>Email:</strong> {student.email}
      </p>
      <p>
        <strong>DOB:</strong> {student.date_of_birth}
      </p>
      <p>
        <strong>Gender:</strong> {student.gender}
      </p>
      <h5>Marks</h5>
      <ul>
        {student.Marks &&
          student.Marks.map((mark) => (
            <li key={mark.mark_id}>
              {mark.subject}: {mark.marks_obtained} ({mark.exam_date})
            </li>
          ))}
      </ul>
      <button className="btn btn-secondary mt-2" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default StudentDetails;
