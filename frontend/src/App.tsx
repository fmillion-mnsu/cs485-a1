// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from './constants';

// Libraries
import axios from 'axios';

import { Button, Container, Modal, Navbar, NavbarBrand, Spinner, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faBullhorn, faCheck, faMagnifyingGlass, faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';

// Project
import { tNewProject, tProject } from './types';
import NewProject from './NewProject';
import ConfirmDelete from './Confirm';

function App() {

  const [data, setData] = useState<tProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  const [newProjectData, setNewProjectData] = useState<tNewProject>();
  const [deleteProjectName, setDeleteProjectName] = useState<string>("");
  const [deleteProjectId, setDeleteProjectId] = useState<number>(0);

  const globalToastSettings: ToastOptions = {
    position: 'top-center',
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored"
  }

  function toggleCodeReview(id: number) {
    axios.post(`${API_URL}/projects/${id}/code_review`)
      .then(response => {
        // get the item from 'data' that has 'id' equalling id
        const item = data.find(item => item.id === id);
        // Display toast
        if (item?.code_review_completed) {
          toast.success("The code review for " + item?.project_name + " was revoked. The " + item?.project_name + " team probably got caught using too much GitHub Copilot.", globalToastSettings);
        }
        else {
          toast.success(item?.project_name + " has successfully completed its code review. Either that, or the team hacked the database to update the status rather than spending time working on the project. Either way, the update was successful.", globalToastSettings);
        }
        // Retrieve data again to update form
        getData();
      })
      .catch(error => {
        toast.error('There was an error updating the status of the code review.', globalToastSettings);
        console.log(error);
      });
  }

  function toggleNDA(id: number) {
    axios.post(`${API_URL}/projects/${id}/nda`)
      .then(response => {
        // get the item from 'data' that has 'id' equalling id
        const item = data.find(item => item.id === id);
        // Display toast
        if (item?.is_nda) {
          toast.success("Yay! " + item?.project_name + " is now no longer under NDA and can be discussed, gossiped about, disparaged, and otherwise blabbed about in public to your heart's content. We'll wait for the new Spotify song all about the project!", globalToastSettings);
        }
        else {
          toast.success(<span>Hush hush. {item?.project_name} is now under NDA. That means that if you speak about {item?.project_name} in public, you might <strong>F</strong>ind that you experience <strong>F</strong>ailure in <strong>F</strong>inding a <strong>F</strong>unctional o<strong>FF</strong>ice in your <strong>F</strong>uture.</span>, globalToastSettings);
        }
        // Retrieve data again to update form
        getData();
      })
      .catch(error => {
        toast.error('There was an error updating the status of the project NDA.', globalToastSettings);
        console.log(error);
      });
  }

  function confirmDeleteProject(name: string, id: number) {
    setDeleteProjectName(name);
    setDeleteProjectId(id);
    setShowDeleteProject(true);
  }

  function deleteProject(id: number) {
    axios.delete(`${API_URL}/projects/${id}`)
    .then(response => {
      // get the item from 'data' that has 'id' equalling id
      const item = data.find(item => item.id === id);
      toast.success(<span>{item?.project_name} is no more. It's gone. It went kaput. It went the way of the dodo. It got redirected to /dev/null. Someone executed <code>rm -rf</code> on the codebase. Either way, bye bye {item?.project_name}, was nice knowin' ya.</span>, globalToastSettings);
      // Retrieve data again to update form
      getData();
    })
    .catch(error => {
      toast.error('There was an error deleting the project.', globalToastSettings);
      console.log(error);
    });
    handleCloseModal();
  }

  function handleSaveModal() {
    //console.dir(newProjectData);

    axios.put(API_URL + '/project', newProjectData)
      .then(response => {
        toast.success(<>{newProjectData?.project_name} was just created! The CS program needs <strong>more students</strong>!</>, globalToastSettings);
        getData();
      })
      .catch(error => {
        toast.error('There was an error adding the project to the database.', globalToastSettings);
        console.log(error);
      });
    setShowNewProject(false);
  }

  function getData() {

    if (!API_URL) {
      toast.error('API_URL is not set. Please set the API_URL environment variable when running your container.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
      return;
    }

    axios.get(API_URL+'/projects')
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        toast.error('Error fetching data.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored"
        });
        console.log(error);
      });
  }

  function handleCloseModal() {
    // hide all modals
    setShowNewProject(false);
    setShowDeleteProject(false);
  }

  function handleOpenCreateModal() {
    setShowNewProject(true);
  }

  // Download the data from the server on page load
  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [])

  return (
    <div className="App">
      <Navbar className="mnsu" fixed="top">
        <Container>
           <NavbarBrand className="mnsu"><strong>Computer Science</strong> &nbsp; Spring '24</NavbarBrand>
        </Container>
      </Navbar>

      <div className="content">
        <div className="right-align breathing-room-vertical">
          <Button onClick={handleOpenCreateModal} variant="primary" title="Add Project"><FontAwesomeIcon icon={faPlus} /> Add Project</Button>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th className="mnsu">Project Name</th>
              <th style={{"width": "18em"}} className="mnsu">Code Review Completed</th>
              <th style={{"width": "18em"}} className="mnsu">Is NDA</th>
              <th style={{"width": "18em"}} className="mnsu">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((project) => (
              <tr key={project.id}>
                <td style={{"fontSize": "133%", "verticalAlign": "middle", "margin": "auto 0"}}>{project.project_name}</td>
                <td>{project.code_review_completed ? 
                  <span className="success"><FontAwesomeIcon icon={faCheck} /></span> : 
                  <span className="failure"><FontAwesomeIcon icon={faXmark} /></span>
                }</td>
                <td>{project.is_nda ? 
                  <span className="success"><FontAwesomeIcon icon={faCheck} /></span> : 
                  <span className="failure"><FontAwesomeIcon icon={faXmark} /></span>
                }</td>
                <td style={{"textAlign": "center"}}>
                  <Button onClick={() => toggleCodeReview(project.id)} title={ project.code_review_completed ? "Revoke Code Review" : "Complete Code Review" }>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />&nbsp;
                    <FontAwesomeIcon icon={faArrowRightLong} />&nbsp;
                    { project.code_review_completed ? 
                    <FontAwesomeIcon icon={faXmark} /> :
                    <FontAwesomeIcon icon={faCheck} /> }
                  </Button>
                  &nbsp;
                  <Button onClick={() => toggleNDA(project.id)} title={ project.is_nda ? "Privatize Project" : "Publicize Project" }>
                    <FontAwesomeIcon icon={faBullhorn} />&nbsp;
                    <FontAwesomeIcon icon={faArrowRightLong} />&nbsp;
                    { project.is_nda ? 
                    <FontAwesomeIcon icon={faXmark} /> :
                    <FontAwesomeIcon icon={faCheck} /> }
                  </Button>
                  &nbsp;
                  <Button onClick={() => confirmDeleteProject(project.project_name, project.id)} variant="danger" title="Delete Project">
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        { isLoading && 
          <div className="center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        }
        
        <Navbar className="mnsu" fixed="bottom" bg="dark">
          <Container className="mnsu d-flex justify-content-center">
            <small>Minnesota State University, Mankato</small>
          </Container>
        </Navbar>

      </div>
      
      <Modal className="mnsu-modal" show={showNewProject} animation={false} onHide={handleCloseModal}>
      <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewProject setProjectData={setNewProjectData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" className="mnsu" onClick={handleSaveModal}>
            Create Project
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal className="mnsu-modal" show={showDeleteProject} animation={false} onHide={handleCloseModal}>
      <Modal.Header closeButton>
          <Modal.Title>Confirm Deleting Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ConfirmDelete projectName={deleteProjectName} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" className="mnsu" onClick={() => deleteProject(deleteProjectId)}>
            <strong>Delete Project</strong>
          </Button>
        </Modal.Footer>
      </Modal>
      
      <ToastContainer />

    </div>
  );
}

export default App;
