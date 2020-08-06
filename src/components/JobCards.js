import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import moment from "moment";
import { useHistory } from "react-router-dom";

export default function JobCards({ job }) {
    let history = useHistory();
    const getDetail = (id) => {
        // lets go to
        history.push(`/jobs/${id}`);
    };
    return (
        <div className="job-content" onClick={() => getDetail(job.id)}>
            <Row>
                <Col>
                    <div className="jobcard-logo">
                        <img src={job.img} />
                    </div>
                </Col>
                <Col xs={8}>
                    <div className="jobcard-descriptions">

                        <h3 className="title" onClick={() => getDetail(job.id)}>
                            {job.title}
                        </h3>
                        <div>$ {job.salary}</div>
                        <div>
                            <ul className="benefit-list">
                                {job.benefits.map(benefit => (
                                    <li>{benefit}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            {job.tags.map(tag => (
                                <Badge variant="secondary" className="badge-style">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                    </div>

                </Col>
                <Col>
                <div className="jobcard-location">
              <div>{job.city}</div>
              <div>District {job.district}</div>
            </div>
            <div className="job-time">{moment(job.time).fromNow()}</div>

                </Col>
            </Row>
        </div>
    )
}
