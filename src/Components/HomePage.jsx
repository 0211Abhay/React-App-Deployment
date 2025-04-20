import React, { useEffect, useState } from "react";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import axios from "axios";

function HomePage() {
  const [students, setStudents] = useState([]);
  const [studentToUpdate, setStudentToUpdate] = useState(null);
  const [studentExist, setStudentExist] = useState("");

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = () => {
    axios.get("http://localhost:3000/student").then((res) => {
      let students = res.data.data.map((ele) => {
        return { student_enroll: ele.student_enroll, student_name: ele.student_name, marks: [ele.studentmarks[0].subject1, ele.studentmarks[0].subject2, ele.studentmarks[0].subject3, ele.studentmarks[0].subject4, ele.studentmarks[0].subject5], percentage: ele.studentmarks[0].percentage, id: ele.studentmarks[0].id }
      });
      setStudents(students);
    });
  };

  const addOrUpdateStudent = (student) => {
    if (studentToUpdate) {
      // If studentToUpdate is set, update existing student
      // const updatedStudents = students.map((s, index) =>
      //   index === studentToUpdate.index ? student : s
      // );
      // console.log(student)
      // console.log(updatedStudents)
      axios
        .put("http://localhost:3000/student/" + student.student_enroll, {
          student_name: student.student_name
        })
        .then(async (res) => {
          await axios
            .put("http://localhost:3000/studentmark/" + student.student_enroll, {
              subject1: Number(student.marks[0]),
              subject2: Number(student.marks[1]),
              subject3: Number(student.marks[2]),
              subject4: Number(student.marks[3]),
              subject5: Number(student.marks[4]),
              percentage: Number(student.percentage),
            })
            .then((res) => {
              handleFetchData();
            });
        });
      // setStudents(updatedStudents);
      setStudentToUpdate(null); // Reset studentToUpdate
    } else {
      // Otherwise, add new student
      // setStudents([...students, student]);
      axios
        .post("http://localhost:3000/student", {
          student_enroll: student.student_enroll,
          student_name: student.student_name
        })
        .then(async (res) => {
          if (res.data.message == "Error") {
            setStudentExist(res.data.data)
          }
          else {
            setStudentExist("")
            await axios
              .post("http://localhost:3000/studentmark", {
                student_enroll: Number(student.student_enroll),
                subject1: Number(student.marks[0]),
                subject2: Number(student.marks[1]),
                subject3: Number(student.marks[2]),
                subject4: Number(student.marks[3]),
                subject5: Number(student.marks[4]),
                percentage: Number(student.percentage),
              })
              .then((res) => {
                handleFetchData();
              });
          }
        });
    }
  };

  const deleteStudent = (index) => {
    axios
      .delete("http://localhost:3000/studentmark/del/" + students[index].id)
      .then(async (res) => {
        await axios
          .delete("http://localhost:3000/student/del/" + students[index].student_enroll)
          .then((res) => {
            handleFetchData();
          });
      });
  };

  const updateStudent = (index) => {
    const studentToUpdate = students[index];
    setStudentToUpdate({ ...studentToUpdate, index });
  };

  return (
    <div>
      <h1>Student Result Management System</h1>
      <StudentForm
        addOrUpdateStudent={addOrUpdateStudent}
        studentToUpdate={studentToUpdate}
        studentExist={studentExist}
      />
      <hr />
      <h2>Students List</h2>
      <StudentList
        students={students}
        deleteStudent={deleteStudent}
        updateStudent={updateStudent}
      />
    </div>
  );
}

export default HomePage;
