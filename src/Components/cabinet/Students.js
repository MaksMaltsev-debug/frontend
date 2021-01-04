import React, {Component} from "react";
import * as axios from "axios";
import "./StudentsStyles.css";
import Student from "./Student";
import Pagination from "./Pagination";


export class Students extends Component {
    state = {
        posts: [],
        loading: false,
        currentPage: 1,
        postsPerPage: 15
    }

    componentDidMount() {
        const getAllUsers = async () => {
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
                url: 'http://localhost:8091/class-management/all-users'
            };
            const response = await axios(options);
            this.setState({posts: response.data});
            this.setState({loading: false});
        };
        getAllUsers();
    }


    render() {
        const {currentPage, postsPerPage, posts, loading} = this.state
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

        const paginate = pageNum => this.setState({ currentPage: pageNum });

        const nextPage = () => this.setState({ currentPage: currentPage + 1 });

        const prevPage = () => this.setState({ currentPage: currentPage - 1 });
        return (
            <div className={"class-container"}>
                <Student posts={currentPosts} loading={loading}/>
                <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
            </div>

        )
    }

}
export default Students;