import  { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import Accordion from 'react-bootstrap/Accordion';
import "./App.css";

const App = () => {
  const [overview, setOverview] = useState({});
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/getOverview").then(res => res.json()).then(data => setOverview(data));
    fetch("http://localhost:8000/getEdu").then(res => res.json()).then(data => setEducation(data));
    fetch("http://localhost:8000/getExp").then(res => res.json()).then(data => setExperience(data));
    fetch("http://localhost:8000/getSkills").then(res => res.json()).then(data => setSkills(data));
    fetch("http://localhost:8000/getProjects").then(res => res.json()).then(data => setProjects(data));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setSuccessMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    });
  };

  return (
    <div className="container mt-4">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        {overview.name}
      </motion.h1>
      <h3>{overview.role}</h3>
      <p>{overview.summary}</p>

      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
        <h2>Education</h2>
        {education.map((edu, index) => (
          <p key={index}>{edu.degree} at {edu.school} ({edu.year})</p>
        ))}
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
        <h2>Experience</h2>
        {experience.map((exp, index) => (
          <p key={index}>{exp.role} at {exp.company} ({exp.duration})</p>
        ))}
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Skills</Accordion.Header>
        <Accordion.Body>
          <ul>
            {skills.map((skill, index) => <li key={index}>{skill}</li>)}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Projects</Accordion.Header>
        <Accordion.Body>
          {projects.map((project, index) => (
            <div key={index}>
              <h4>{project.name}</h4>
              <p>{project.description}</p>
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Contact Me</Accordion.Header>
        <Accordion.Body>
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
      
          
          {successMessage && <p className="text-success">{successMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Message:</label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
          
        </motion.div>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
        
      </motion.div>

      

      
    </div>
  );
};

export default App;