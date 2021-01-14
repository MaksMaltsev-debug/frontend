import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import defaultPhoto from "./image/web-user.jpeg";
import {Link} from "react-router-dom";

export class Student extends Component {
    render() {
        const {posts, loading} = this.props;
        if (loading) {
            return <h2>Loading...</h2>
        }
        return (
            <div className={"class-container"}>
                {posts.map(user => (
                    <Card key={user.id}>
                        <Card.Img variant="top" src={user.photo == null ? defaultPhoto : `data:image/jpeg;base64,${user.photo}`}/>
                        <Card.Body>
                            <Card.Title>{user.name} {user.lastName}</Card.Title>
                            <Card.Text>
                                {user.email}
                            </Card.Text>
                            <Link to={"/cabinet/student-info/"+user.id}>
                                <Button variant="primary">More Details</Button>
                            </Link>

                        </Card.Body>
                    </Card>))}
            </div>
        )
    }
}

export default Student;