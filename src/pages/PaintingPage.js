// PaintingPage.js
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addJob, getAllJobs } from "../redux/actions/jobActions";

const PaintingPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    jobName: "",
    description: "",
    eta: "",
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setFormData({
      jobName: "",
      description: "",
      eta: "",
    });
    setShowModal(true);
  };

  const token = useSelector((state) => state?.auth?.user?.tokens.access.token);
  const jobsData = useSelector((state) => state?.jobs?.jobsData);

  useEffect(() => {
    dispatch(getAllJobs(token));
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const success = await dispatch(addJob(formData,token));

    if (success) {
      setFormData({
        jobName: "",
        description: "",
        eta: "",
      });


    dispatch(getAllJobs(token));
    handleClose();
    }


  };

  

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Painting Jobs</h2>
        <Button variant="primary" onClick={handleShow}>
          Add New Painting Job
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Job Name</th>
            <th>Job Description</th>
            <th>ETA</th>
          </tr>
        </thead>
        <tbody>
          {jobsData?.results
            .map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.jobName}</td>
                <td>{job.description}</td>
                <td>{job.eta}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Paining Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicJobName">
              <Form.Label className="mb-1">Job Name</Form.Label>
              <Form.Control
                type="text"
                name="jobName"
                value={formData.jobName}
                placeholder="Enter Job name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label className="mb-1">Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                placeholder="Enter Description"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEta">
              <Form.Label className="mb-1">ETA (in Hours)</Form.Label>
              <Form.Control
                type="number"
                name="eta"
                value={formData.eta}
                placeholder="Enter ETA"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaintingPage;
