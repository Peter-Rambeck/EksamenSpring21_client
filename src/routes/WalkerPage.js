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

const initialvalues2 = [
  {
    id: "1",
    name: "",
    address: "",
    phone: "",
  },
];

export default function WalkerPage(props) {
  const [walkers, setwalkers] = useState(initialvalues2);

  const [edit, setEdit] = useState(0);
  const [refresh, setrefresh] = useState(0);

  // Get walker data
  React.useEffect(() => {
    fetchData(
      "https://www.indochinaexplorers.com/tomcat/dog-walker/api/walker/all"
    )
      .then((data) => setwalkers(data))
      .catch((err) => console.log(err));
  });

  return (
    <div className="container">
      <h1>Dogwalker page</h1>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <h2>Dog walkers</h2>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {walkers && (
                  <>
                    {walkers.map((item) => (
                      <tr key={item.id} onClick={() => setEdit(item.id)}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.phone}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
