import React, { useEffect } from "react";
import { useState } from "react";
import { fetchData, https } from "../apiUtils";
import {
  Accordion,
  Card,
  Col,
  Container,
  Nav,
  Row,
  Form,
  Button,
} from "react-bootstrap";

const initialValues = {
  name: "",
  breed: "",
  image: "",
  gender: "",
  birthdate: "",
  owner: "",
};

const initialvalues2 = [
  {
    id: "1",
    name: "",
    breed: "",
    image: "",
    gender: "",
    owner: "",
  },
];

const initialvalues3 = [
  {
    id: "1",
    name: "",
    address: "",
    address2: "",
    phone: "",
  },
];

export default function DogPage() {
  const [dogs, setDogs] = useState(initialvalues2);
  const [formData, setFormData] = useState(initialValues);
  const [owner, setOwners] = useState(initialvalues3);

  const [edit, setEdit] = useState(0);
  const [edit2, setEdit2] = useState(0);
  const [refresh, setrefresh] = useState(0);

  // Get dog data for map
  React.useEffect(() => {
    fetchData(
      "https://www.indochinaexplorers.com/tomcat/dog-walker/api/dog/all"
    )
      .then((data) => setDogs(data))
      .catch((err) => console.log(err));
  });

  // Edit new dog
  function handleSubmit(event) {
    event.preventDefault();
    const body = { ...formData };
    console.log("Formdata: " + formData);
    fetchData(
      "https://www.indochinaexplorers.com/tomcat/dog-walker/api/dog/edit",
      https.PUT,
      body
    );
    setFormData(initialValues);
    setrefresh(refresh + 1);
    setEdit(null);
  }

  // Get dog by ID
  useEffect(() => {
    fetchData(
      "https://www.indochinaexplorers.com/tomcat/dog-walker/api/dog" +
        "/" +
        edit,
      https.GET
    )
      .then((data) => setFormData(data))
      .catch((err) => console.log(err));
    console.log("Edit : " + edit);
  }, [edit]);

  // update formdata
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // Create new dog
  function handleSubmit2(event) {
    event.preventDefault();
    const body = { ...formData };
    console.log("Formdata 2: " + formData);
    fetchData(
      "https://www.indochinaexplorers.com/tomcat/dog-walker/api/dog",
      https.POST,
      body
    );
    setFormData(initialValues);
    setrefresh(refresh + 1);
    setEdit(null);
  }

  // Delete a dog
  function handleDelete(event) {
    fetchData(
      "https://www.indochinaexplorers.com/tomcat/dog-walker/api/dog" +
        "/" +
        edit,
      https.DELETE
    ).then(setrefresh(refresh + 1));
  }

  // Get owner data for map
  React.useEffect(() => {
    fetchData(
      "https://www.indochinaexplorers.com/tomcat/dog-walker/api/owner/all"
    )
      .then((data) => setOwners(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const body = { ...formData };
    fetchData(
      "https://www.indochinaexplorers.com/tomcat/dog-walker/api/dog/add" +
        "/" +
        edit2,
      https.PUT,
      body
    )
      .then((data) => setFormData(data))
      .catch((err) => console.log(err));
  }, [edit2]);

  return (
    <div className="container">
      <h1>Dog page</h1>
      <hr />
      <div className="col-md-12">
        <h2>Dogs</h2>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Breed</th>
                <th>Image</th>
                <th>Gender</th>
                <th>Birthdate</th>
                <th>Owner</th>

                <th>Edit Dog</th>
                <th>Delete Dog</th>
              </tr>
            </thead>
            <tbody>
              {dogs && (
                <>
                  {dogs.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.breed}</td>
                      <td>{item.image}</td>
                      <td>{item.gender}</td>
                      <td>{item.birthdate}</td>
                      <td>0</td>

                      <td>
                        <button onClick={() => setEdit(item.id)}>Edit</button>
                      </td>
                      <td>
                        <button onClick={handleDelete}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h2>Owners</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Address</th>
                <th>Address2</th>
                <th>Phone</th>

                <th>Add Owner</th>
              </tr>
            </thead>
            <tbody>
              {owner && (
                <>
                  {owner.map((item) => (
                    <tr key={item.id} onClick={() => setEdit2(item.id)}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>{item.address2}</td>
                      <td>{item.phone}</td>

                      <td>
                        <button>Add</button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formData">
              <Form.Label>
                {" "}
                <h2>Dogform</h2>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
              <Form.Control
                type="textr"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="Enter breed"
              />
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="upload image"
              />
              <Form.Control
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="List gender"
              />
              <Form.Control
                type="text"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                placeholder="Enter birthdate"
              />
            </Form.Group>
            <Button block type="submit">
              Edit
            </Button>
            <Button block onClick={handleSubmit2}>
              Add dog
            </Button>
            <Button block onClick={handleDelete}>
              Delete dog
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
