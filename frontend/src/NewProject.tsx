import React from 'react';
import { Form } from 'react-bootstrap';
import { tNewProject } from './types';

interface NewProjectProps {
    setProjectData: (data: tNewProject) => void;
}

const NewProject = (props: NewProjectProps) => {
    // Implement your component logic here
    function setProjectData() {
        // Get the value of the form field with id form_name
        const projectName = (document.getElementById('form_name') as HTMLInputElement).value;
        // Get the value of the form field with id form_nda
        const isNDA = (document.getElementById('form_nda') as HTMLInputElement).checked;

        // Create a new project object
        const newProject: tNewProject = {
            project_name: projectName,
            is_nda: isNDA
        };
        // Call the setProjectData function from the props and pass the new project object
        props.setProjectData(newProject);
    }
    
    return (
        <div>
            <Form onChange={setProjectData}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control id="form_name" placeholder="The Next Big Thing" />
                    <Form.Text  className="text-muted">
                    Make it a good one!
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check id="form_nda" type="checkbox" label="Project requires a Non-Disclosure Agreement (NDA)" />
                </Form.Group>
            </Form>
        </div>
    );
};

export default NewProject;