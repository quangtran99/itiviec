import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Button, Row, Container, Col } from "react-bootstrap";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";



const apiAddress = process.env.REACT_APP_SERVER_URL;
export default function Detail({ props }) {
  console.log("whats inside of props?", props);

  let { id } = useParams();
  let [job, setJob] = useState(null);

  let getDetailData = async () => {
    let url = `${apiAddress}/jobs/${id}`; // importnat
    let response = await fetch(url);
    let result = await response.json();
    console.log("you can get only one exactly job", result);
    setJob(result);
  };

  useEffect(() => {
    getDetailData();
  }, []);

  if (job == null) {
    return <div>loading</div>;
  }
  return (
    <div className="App">
      <div className="navigation">
        <Container>
          <img
            className="logo-itviec"
            alt="itviec"
            src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png"
          />
        </Container>
      </div>
      <div className="container wrapper d-flex justify-content-center">


        <div className="card-w">
          <div className="card inset">

            <div className="card__text">
              <Row>
                <Col>
                  <img src={job.img} />
                </Col>
                <Col xs={10}>
                  <h4>{job.title}</h4>
                  <div style={{ paddingTop: "10px", color: "grey" }}>
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      style={{ marginRight: "10px" }}
                    />{" "}
                    {job.salary}
                  </div>
                  <div style={{ color: "grey" }}>
                    <FontAwesomeIcon
                      icon={faMapMarker}
                      style={{ marginRight: "10px" }}
                    />{" "}
                    {job.city} District {job.district}
                  </div>
                  <div style={{ paddingTop: "20px" }}>
                    <h2>Benefit</h2>
                    <ul className="benefit-list" style={{ fontSize: "18px" }}>
                      {job.benefits.map((benefit) => (
                        <li>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ color: "blue" }}>
                    <FontAwesomeIcon
                      icon={faCalendar}
                      style={{ marginRight: "10px" }}
                    />
                    {moment(job.time).fromNow()}
                  </div>
                  <div style={{ paddingTop: "20px" }}>
                    <h2>Description</h2>
                    <div>{job.description}</div>
                  </div>
                  <Row className="apply-style">
                    <h5>
                      {job.tags.map((tag) => (
                        <Badge variant="secondary" style={{ margin: "5px" }}>
                          {tag}
                        </Badge>
                      ))}
                    </h5>
                    <Button
                      variant="danger"
                      style={{ width: "100%", marginTop: "30px", fontSize: "18px" }}
                    >APPLY</Button>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}