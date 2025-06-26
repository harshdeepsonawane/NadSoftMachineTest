import React, { useState, useEffect } from "react";
import { createStudent, updateStudent } from "../api";
import Swal from "sweetalert2";
//import { toast } from "react-toastify";
import { FaPlus, FaTrash } from "react-icons/fa";

function StudentForm({ editingStudent, onSave }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    date_of_birth: "",
    marks: [],
  });
  const [markEntry, setMarkEntry] = useState({
    subject: "",
    marks_obtained: "",
    exam_date: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setForm({
        ...editingStudent,
        marks: editingStudent.marks || [],
      });
    }
  }, [editingStudent]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMarkChange = (e) => {
    setMarkEntry({ ...markEntry, [e.target.name]: e.target.value });
  };

  const addMark = () => {
    if (markEntry.subject && markEntry.marks_obtained && markEntry.exam_date) {
      setForm({ ...form, marks: [...form.marks, markEntry] });
      setMarkEntry({ subject: "", marks_obtained: "", exam_date: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.student_id, form);
        Swal.fire("Updated", "Student updated successfully", "success");
      } else {
        await createStudent(form);
        Swal.fire("Created", "Student added successfully", "success");
      }
      onSave();
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        date_of_birth: "",
        marks: [],
      });
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };
  const handleNewMarkChange = (e) => {
    setMarkEntry({ ...markEntry, [e.target.name]: e.target.value });
  };
  const removeMark = (index) => {
    const updatedMarks = form.marks.filter((_, i) => i !== index);
    setForm({ ...form, marks: updatedMarks });
  };

  return (
    <form onSubmit={handleSubmit} className="shadow-sm p-4 rounded bg-light">
      <div className="row">
        <div className="col">
          <div className="form-floating mb-3">
            <input
              name="first_name"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
            <label htmlFor="firstName">First Name</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating mb-3">
            <input
              name="last_name"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              required
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
        </div>
      </div>

      <div className="form-floating mb-3">
        <input
          name="email"
          className="form-control"
          id="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
      </div>

      <div className="form-floating mb-3">
        <input
          name="date_of_birth"
          type="date"
          className="form-control"
          id="dob"
          placeholder="Date of Birth"
          value={form.date_of_birth}
          onChange={handleChange}
          required
        />
        <label htmlFor="dob">Date of Birth</label>
      </div>

      <div className="form-floating mb-4">
        <select
          name="gender"
          className="form-select"
          id="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label htmlFor="gender">Gender</label>
      </div>

      <h5 className="text-secondary mb-3">📚 Subjects & Marks</h5>
      {form.marks.map((m, i) => (
        <div
          key={i}
          className="row mb-3 align-items-end shadow-sm p-3 bg-white rounded"
        >
          <div className="col">
            <label>Subject</label>
            <input
              type="text"
              className="form-control"
              value={m.subject}
              onChange={(e) => handleMarkChange(i, "subject", e.target.value)}
            />
          </div>
          <div className="col">
            <label>Marks</label>
            <input
              type="number"
              className="form-control"
              value={m.marks_obtained}
              onChange={(e) =>
                handleMarkChange(i, "marks_obtained", e.target.value)
              }
            />
          </div>
          <div className="col">
            <label>Exam Date</label>
            <input
              type="date"
              className="form-control"
              value={m.exam_date}
              onChange={(e) => handleMarkChange(i, "exam_date", e.target.value)}
            />
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => removeMark(i)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      <div className="border p-3 mb-4 bg-white rounded">
        <h6 className="mb-3">➕ Add New Mark</h6>
        <div className="row">
          <div className="col">
            <input
              name="subject"
              placeholder="Subject"
              className="form-control mb-2"
              value={markEntry.subject}
              onChange={handleNewMarkChange}
            />
          </div>
          <div className="col">
            <input
              name="marks_obtained"
              type="number"
              placeholder="Marks"
              className="form-control mb-2"
              value={markEntry.marks_obtained}
              onChange={handleNewMarkChange}
            />
          </div>
          <div className="col">
            <input
              name="exam_date"
              type="date"
              className="form-control mb-2"
              value={markEntry.exam_date}
              onChange={handleNewMarkChange}
            />
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={addMark}
            >
              <FaPlus className="me-1" /> Add
            </button>
          </div>
        </div>
      </div>

      <button className="btn btn-success w-100">
        {editingStudent ? "Update Student" : "Create Student"}
      </button>
    </form>
  );
}

export default StudentForm;
