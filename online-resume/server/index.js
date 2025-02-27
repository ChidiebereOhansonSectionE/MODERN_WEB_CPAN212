const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());


const PORT = 8000;

const resumeData = {
    overview: {
        name: "Ohanson Chidiebere",
        role: "Front-End Developer",
        summary: "Passionate front-end developer with experience in React, JavaScript, and UI/UX design."
    },
    education: [
        { school: "Humber College", degree: "Diploma in Computer Programming", year: "2024-2025" }
    ],
    experience: [
        { company: "ABC Tech", role: "Front-End Developer", duration: "2025-Present" }
    ],
    skills: ["HTML", "CSS", "JavaScript", "React", "Database design", "Tailwind CSS"],
    projects: [
        { name: "Portfolio Website", description: "A personal portfolio using React and Tailwind." },
        { name: "E-commerce App", description: "Built an e-commerce store with React and Firebase." }
    ]
};

// Endpoints
app.get('/getOverview', (req, res) => res.json(resumeData.overview));
app.get('/getEdu', (req, res) => res.json(resumeData.education));
app.get('/getExp', (req, res) => res.json(resumeData.experience));
app.get('/getSkills', (req, res) => res.json(resumeData.skills));
app.get('/getProjects', (req, res) => res.json(resumeData.projects));

// Contact form submission
app.post('/sendMessage', (req, res) => {
    const { name, email, message } = req.body;
    console.log("New Contact Message:", { name, email, message });
    res.json({ success: true, message: "Message received!" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));