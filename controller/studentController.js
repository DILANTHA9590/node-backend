import Student from "../modules/students.js";

export function getStudent(req, res) {
  Student.find().then((studentList) => {
    res.json({
      list: studentList,
    });
  });
}

export function createStudent(req, res) {
  const student = new Student(req.body);
  student
    .save()
    .then(() => {
      res.json({
        message: "student created",
      });
    })
    .catch(() => {
      res.json({
        message: "student not created",
      });
    });
}

export function deleteStudent(req, res) {
  Student.deleteOne({ name: req.body.name }).then(() => {
    res.json({
      message: "student deleted",
    });
  });
}