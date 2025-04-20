import React from "react";
import StudentRow from "./StudentRow";

function StudentList({ students, deleteStudent, updateStudent }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Enrollment</th>
          <th>Subject 1</th>
          <th>Subject 2</th>
          <th>Subject 3</th>
          <th>Subject 4</th>
          <th>Subject 5</th>
          <th>Percentage</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <StudentRow
            key={index}
            index={index}
            student={student}
            deleteStudent={deleteStudent}
            updateStudent={updateStudent}
          />
        ))}
      </tbody>
    </table>
  );
}

export default StudentList;
