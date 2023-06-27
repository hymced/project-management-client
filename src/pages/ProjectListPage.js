import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddProject from "../components/AddProject";
import ProjectCard from "../components/ProjectCard";

// import axios from "axios";
// const API_URL = "http://localhost:5005";

import projectsService from '../services/projects.service';

function ProjectListPage() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // axios
    //   .get(`${API_URL}/api/projects`, { headers: { Authorization: `Bearer ${storedToken}` } })
    projectsService.getAllProjects()
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProjects();
  }, [] );


  return (
    <div className="ProjectListPage">

      <AddProject refreshProjects={getAllProjects} />

      { projects.map((project) => (
        <ProjectCard key={project._id} {...project} />
      ))}

    </div>
  );
}

export default ProjectListPage;