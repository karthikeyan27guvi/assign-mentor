import Mentor from "/models/mentor.js"
import Student from "/models/student.js"

const Mentor = require('./models/Mentor');

app.post('/api/mentor', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const mentor = new Mentor({ name, email, phone });
    await mentor.save();
    res.status(201).json({ message: 'Mentor created successfully', mentor });
  } catch (err) {
    res.status(500).json({ message: 'Error creating mentor', error: err.message });
  }
});


const Student = require('./models/Student');

app.post('/api/student', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const student = new Student({ name, email, phone });
    await student.save();
    res.status(201).json({ message: 'Student created successfully', student });
  } catch (err) {
    res.status(500).json({ message: 'Error creating student', error: err.message });
  }
});


app.post('/api/assign-mentor', async (req, res) => {
    try {
      const { studentId, mentorId } = req.body;
      
      const student = await Student.findById(studentId);
      if (!student) return res.status(404).json({ message: 'Student not found' });
  
      const mentor = await Mentor.findById(mentorId);
      if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
  
      student.mentor = mentorId;
      await student.save();
      
      res.status(200).json({ message: 'Student assigned to mentor successfully', student });
    } catch (err) {
      res.status(500).json({ message: 'Error assigning mentor', error: err.message });
    }
  });

  
  app.get('/api/mentor/:mentorId/students', async (req, res) => {
    try {
      const mentorId = req.params.mentorId;
      
      const students = await Student.find({ mentor: mentorId });
      res.status(200).json({ students });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching students for mentor', error: err.message });
    }
  });

  
  app.get('/api/student/:studentId/mentor', async (req, res) => {
    try {
      const studentId = req.params.studentId;
      
      const student = await Student.findById(studentId).populate('mentor');
      if (!student) return res.status(404).json({ message: 'Student not found' });
  
      res.status(200).json({ mentor: student.mentor });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching mentor for student', error: err.message });
    }
  });

  
  app.put('/api/student/:studentId/mentor', async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const { mentorId } = req.body;
  
      const student = await Student.findById(studentId);
      if (!student) return res.status(404).json({ message: 'Student not found' });
  
      const mentor = await Mentor.findById(mentorId);
      if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
  
      student.mentor = mentorId;
      await student.save();
  
      res.status(200).json({ message: 'Mentor changed successfully', student });
    } catch (err) {
      res.status(500).json({ message: 'Error changing mentor', error: err.message });
    }
  });

  
  app.get('/api/students', async (req, res) => {
    try {
      const students = await Student.find({ mentor: null }); // Only students without mentors
      res.status(200).json({ students });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching students', error: err.message });
    }
  });
  