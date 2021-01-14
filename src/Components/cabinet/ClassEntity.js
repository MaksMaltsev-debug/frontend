import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import defaultPhoto from "./image/class.jpg";
import {Link} from "react-router-dom";

export class ClassEntity extends Component {
    render() {
        const {posts, loading} = this.props;
        if (loading) {
            return <h2>Loading...</h2>
        }
        return (
            <div className={"class-container"}>
                {
                    posts.map(classEmpty => (
                        <Card className={"class-card"}>
                            <div className={"card-header"}>
                                <Card.Img variant="top"
                                          src={classEmpty.photo == null ? defaultPhoto : `data:image/jpeg;base64,${classEmpty.photo}`}/>
                                <Card.Title>{classEmpty.name}
                                    <a href={"/cabinet/scheduler"}>
                                        <div>{(new Date(classEmpty.startTime).toDateString().split(" ")[2]
                                            + " " + new Date(classEmpty.startTime).toDateString().split(" ")[1]
                                            + " " + new Date(classEmpty.startTime).toDateString().split(" ")[3])}-
                                            {(new Date(classEmpty.finishTime).toDateString().split(" ")[2]
                                                + " " + new Date(classEmpty.finishTime).toDateString().split(" ")[1]
                                                + " " + new Date(classEmpty.finishTime).toDateString().split(" ")[3])}
                                        </div>
                                    </a></Card.Title>
                            </div>
                            <Card.Body>
                                <a>
                                    <span className="icon-clock"/>
                                    {classEmpty.startTime.toString().split("T")[1].split("+")[0]}
                                </a>
                                <Card.Text>
                                    {classEmpty.description}
                                </Card.Text>
                                <Link to={"/cabinet/class-info/"+classEmpty.id}>
                                    <Button variant="primary">More Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>))}
            </div>
        )
    }
}

export default ClassEntity;