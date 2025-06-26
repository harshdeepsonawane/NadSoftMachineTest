import React, { useState } from "react";
import StudentList from "./Components/StudentList";
import StudentForm from "./Components/StudentForm";
import StudentDetails from "./Components/StudentDetails";
import { getStudent } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { FaPlus } from "react-icons/fa";

function App() {
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudentId, setViewingStudentId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleEdit = async (student) => {
    try {
      const res = await getStudent(student.student_id);
      const fullStudent = {
        ...res.data,
        marks: res.data.Marks || [],
      };
      setEditingStudent(fullStudent);
      setShowFormModal(true);
    } catch (err) {
      console.error("Failed to load student data:", err);
    }
  };

  const handleView = (id) => {
    setViewingStudentId(id);
    setShowViewModal(true);
  };

  const handleCreate = () => {
    setEditingStudent(null);
    setShowFormModal(true);
  };

  const closeModals = () => {
    setShowFormModal(false);
    setShowViewModal(false);
    setEditingStudent(null);
    setViewingStudentId(null);
  };

  return (
    <div className="container mt-5">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">🎓 Student Management Portal</h2>
        <Button variant="success" onClick={handleCreate}>
          <FaPlus className="me-2" /> Add Student
        </Button>
      </div>

      <StudentList onEdit={handleEdit} onView={handleView} />

      {/* Create/Edit Modal */}
      <Modal show={showFormModal} onHide={closeModals} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingStudent ? "✏️ Edit Student" : "➕ Create Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StudentForm editingStudent={editingStudent} onSave={closeModals} />
        </Modal.Body>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={closeModals} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>📄 Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StudentDetails studentId={viewingStudentId} onClose={closeModals} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
