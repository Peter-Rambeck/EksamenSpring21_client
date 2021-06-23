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
  name: "Hanse",
  address: "",
  phone: "",
};

const initialvalues2 = [
  {
    id: "1",
    name: "Hanse",
    address: "",
    phone: "",
  },
];

export default function WalkerPage(props) {
  const [walkers, setwalkers] = useState(initialvalues2);
  const [formData, setFormData] = useState(initialValues);
  const [edit, setEdit] = useState(0);
  const [refresh, setrefresh] = useState(0);

  // Get walker data
  React.useEffect(() => {
    fetchData(
      "https://www.peterrambeckandersen.com/tomcat/dog-walker/api/walker/all"
    )
      .then((data) => setwalkers(data))
      .catch((err) => console.log(err));
  });

  function handleSubmit(event) {
    event.preventDefault();
    const body = { ...formData };
    console.log("Formdata: " + formData);
    fetchData("", https.PUT, body);
    setFormData(initialValues);
    setrefresh(refresh + 1);
    setEdit(null);
  }

  useEffect(() => {
    fetchData("getById" + "/" + edit, https.GET)
      .then((data) => setFormData(data))
      .catch((err) => console.log(err));
    console.log("Edit 2: " + edit);
  }, [edit]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // Delete a walker
  function handleDelete(id) {
    fetchData("").then(setrefresh(refresh + 1));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Dog walkers</h2>
          <div>
            <table className="table">
              <thead>
                <div>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                  </tr>
                </div>
              </thead>
              <tbody>
                {walkers && (
                  <div>
                    {walkers.map((item) => (
                      <tr key={item.id} onClick={() => setEdit(item.id)}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.phone}</td>
                        <td>
                          <button>Edit</button>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(item.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formData">
              <Form.Label>
                {" "}
                <h2>Dog walkers</h2>
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
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phones"
              />
            </Form.Group>
            <Button block type="submit">
              Edit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
