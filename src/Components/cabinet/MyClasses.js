import React, {Component} from "react";
import * as axios from "axios";
import "./StudentsStyles.css";
import Pagination from "./Pagination";
import ClassEntity from "./ClassEntity";


export class MyClasses extends Component {
    state = {
        classes: [],
        loading: false,
        currentPage: 1,
        postsPerPage: 6
    }

    componentDidMount() {
        const getAllClasses = async () => {
            this.setState({loading: true});
            const token = localStorage.getItem("token");
            const options = {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + token,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Access-Control-Allow-Headers": "X-Requested-With",
                },
                url: 'http://localhost:8091/class-management/my-class'
            };
            const response = await axios(options);
            this.setState({classes: response.data});
            this.setState({loading: false});
            console.log(JSON.stringify(response))
        };
        getAllClasses();
    }


    render() {
        const {currentPage, postsPerPage, classes, loading} = this.state
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = classes.slice(indexOfFirstPost, indexOfLastPost);

        const paginate = pageNum => this.setState({ currentPage: pageNum });

        const nextPage = () => this.setState({ currentPage: currentPage + 1 });

        const prevPage = () => this.setState({ currentPage: currentPage - 1 });
        return (

            <div className={"class-container"}>
                <ClassEntity posts={currentPosts} loading={loading}/>
                <Pagination postsPerPage={postsPerPage} totalPosts={classes.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
            </div>

        )
    }

}
export default MyClasses;