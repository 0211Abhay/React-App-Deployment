import React from "react";

function StudentRow({ student, index, deleteStudent, updateStudent }) {
  return (
    <tr>
      <td>{student.student_name}</td>
      <td>{student.student_enroll}</td>
      {student.marks.map((mark, i) => (
        <td key={i}>{mark}</td>
      ))}
      <td>{student.percentage}</td>
      <td>
        <button onClick={() => updateStudent(index)}>Update</button>
        <button onClick={() => deleteStudent(index)}>Delete</button>
      </td>
    </tr>
  );
}

export default StudentRow;
