import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import JobCards from "../components/JobCards"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const apiAddress = process.env.REACT_APP_SERVER_URL;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Jobs() {
  let query = useQuery();
  let history = useHistory();
  let [jobList, setJobList] = useState([]); // for show on UI
  let [keyword, setKeyword] = useState(query.get("q"));
  let [originalList, setOriginalList] = useState([]); // keep the orignal list



  const getData = async () => {
    try {
      let url = `${apiAddress}/jobs`;
      console.log("url", url);
      let response = await fetch(url);
      let result = await response.json();
      console.log("Result", result);
      setJobList(result);
      setOriginalList(result);
    } catch (err) {
      console.log("err", err.message);
    }
  };



  const searchByKeyword = (e) => {
    let filteredList = originalList;
    if (e) {
      e.preventDefault();
      console.log("keyword?", keyword);
      history.push(`/jobs?q=${keyword}`);
    }

    if (keyword) {
      filteredList = originalList.filter((job) =>
        job.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    setJobList(filteredList);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    searchByKeyword();
  }, [originalList]);

  if (jobList.length == 0) {
    return <h1>loading</h1>;
  }
  return (
    <div>
      <div className="background-header">
        <Container>
          <Col>
            {" "}
            <img
              className="logo-itviec"
              alt="itviec"
              src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png"
            />
          </Col>
          <Form onSubmit={(e) => searchByKeyword(e)}>
            <Row className="search-form-wrapper">
              <Col xs={12} md={10}>
                <div className="search-section-wrapper">
                  <Row className="search-field-wrapper" noGutters={true}>
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="icon-fasearch"
                    />
                    <Col col={12}>
                      <input
                        type="text"
                        value={keyword}
                        className="search-box"
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Keyword skill(Java,IOS...),Job Title..."
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col xs={12} md={2}>
                <button className="search-button" type="submit">Search</button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <div className="job-list">
          {jobList.map((job) => {
            return (
              <JobCards job={job} />
            );
          })}

        </div>
      </Container>
    </div>
  );
}
// 1. when we click the title
// 2. goto detail page
// 3. go to detail page means : you call the url for detail page
// 4. url for detail page?:     /jobs/:id
