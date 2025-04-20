import React, { useEffect, useState } from "react";

function StudentForm({ addOrUpdateStudent, studentToUpdate, studentExist }) {
  const [student, setStudent] = useState({
    student_name: "Abhay Nathwani",
    student_enroll: "92310133007",
    marks: [0, 0, 0, 0, 0],
  });

  const [errors, setErrors] = useState({
    student_name: "",
    student_enroll: "",
    marks: "",
  });

  useEffect(() => {
    if (studentToUpdate) {
      setStudent(studentToUpdate);
    }
  }, [studentToUpdate]);

  useEffect(() => {
    setErrors({ ...errors, student_enroll: studentExist || "" })
  }, [studentExist]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: value.trim() === "" ? `${name} cannot be empty` : "",
    });
  };

  const handleMarksChange = (e, index) => {
    const { value } = e.target;
    const updatedMarks = [...student.marks];
    updatedMarks[index] = parseInt(value);
    setStudent({
      ...student,
      marks: updatedMarks,
    });
    setErrors({
      ...errors,
      marks:
        isNaN(value) || value < 0 || value > 100
          ? "Marks must be between 0 and 100"
          : "",
    });
  };

  const validateEnroll = (enroll) => {
    const reg = /^[0-9]{11}$/;
    return reg.test(enroll);
  };

  const handleAddOrUpdateStudent = () => {
    const { student_name, student_enroll, marks } = student;
    const percentage = calculatePercentage(marks);

    // Validate name, enroll, and marks
    const nameError = student_name.trim() === "" ? "Name cannot be empty" : "";
    const enrollError = !validateEnroll(student_enroll)
      ? "Enrollment must be a number with length 11"
      : "";
    const marksError = marks.some(
      (mark) => isNaN(mark) || mark < 0 || mark > 100
    )
      ? "Marks must be between 0 and 100"
      : "";

    if (nameError || enrollError || marksError) {
      setErrors({
        student_name: nameError,
        student_enroll: enrollError,
        marks: marksError,
      });
    } else {
      addOrUpdateStudent({ ...student, percentage });
      setStudent({
        student_name: "",
        student_enroll: "",
        marks: [0, 0, 0, 0, 0],
      });
      setErrors({
        student_name: "",
        student_enroll: "",
        marks: "",
      });
    }
  };

  const calculatePercentage = (marks) => {
    const totalMarks = marks.reduce((acc, mark) => acc + mark, 0);
    return (totalMarks / 5).toFixed(2);
  };

  return (
    <div>
      <label>
        Name:{" "}
        <input
          type="text"
          placeholder="Enter name"
          name="student_name"
          value={student.student_name}
          onChange={handleChange}
        />
        {errors.student_name && (
          <span className="error">
            <br />
            {errors.student_name}
          </span>
        )}
      </label>
      <br />
      <label>
        Enroll No:{" "}
        <input
          type="text"
          placeholder="Enter enrollment number"
          name="student_enroll"
          value={student.student_enroll}
          onChange={handleChange}
          readOnly={studentToUpdate ? true : false}
        />
        {errors.student_enroll && (
          <span className="error">
            <br />
            {errors.student_enroll}
          </span>
        )}
      </label>
      <br />
      <span>Enter Marks</span>
      {student.marks.map((mark, index) => (
        <div key={index}>
          <label>
            Subject {index + 1} :{" "}
            <input
              key={index}
              type="number"
              value={mark}
              onChange={(e) => handleMarksChange(e, index)}
            />
          </label>
        </div>
      ))}
      {errors.marks && (
        <span className="error">
          {errors.marks}
          <br />
        </span>
      )}

      <button onClick={handleAddOrUpdateStudent}>
        {studentToUpdate ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default StudentForm;
