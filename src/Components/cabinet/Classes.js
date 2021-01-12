import React, {Component} from "react";
import * as axios from "axios";
import "./StudentsStyles.css";
import Pagination from "./Pagination";
import ClassEntity from "./ClassEntity";


export class Classes extends Component {
    state = {
        classes: [],
        loading: false,
        currentPage: 1,
        postsPerPage: 6,
        tabName: 'All classes',
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
                url: 'http://localhost:8091/class-management/all-class'
            };
            const response = await axios(options);
            this.setState({classes: response.data});
            this.setState({loading: false});
        };
        getAllClasses();
    }


    render() {
        const {currentPage, postsPerPage, classes, loading} = this.state
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = classes.slice(indexOfFirstPost, indexOfLastPost);

        const paginate = pageNum => this.setState({currentPage: pageNum});

        const nextPage = () => this.setState({currentPage: currentPage + 1});

        const prevPage = () => this.setState({currentPage: currentPage - 1});


        return (
            <>


                {/*<DropdownButton id="dropdown-basic-button" title={this.state.tabName}>*/}
                {/*    <Dropdown.Item href="#/action-1" onClick={(e) => this.setState({ tabName: e.target.value })}>Action</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-2" onClick={(e) => this.setState({ tabName: e.target.value })}>Another action</Dropdown.Item>*/}
                {/*</DropdownButton>*/}

                <div className={"class-container"}>
                    <ClassEntity posts={currentPosts} loading={loading}/>

                    {/*<div className={"container-user"}>*/}
                    {/*    <Dropdown>*/}
                    {/*        <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
                    {/*            {this.state.tabName}*/}
                    {/*        </Dropdown.Toggle>*/}
                    {/*        <div className={"container-user"}>*/}
                    {/*            <Dropdown.Menu>*/}
                    {/*                <Dropdown.Item href="#/action-1" onClick={(e) => this.setState((e) => {*/}
                    {/*                    return {tabName: "ALL CLASSES"};*/}
                    {/*                })}>ALL CLASSES*/}
                    {/*                </Dropdown.Item>*/}
                    {/*                <Dropdown.Item href="#/action-1" onClick={(e) => this.setState(() => {*/}
                    {/*                    return {tabName: "MY CLASSES"};*/}
                    {/*                })}>*/}
                    {/*                    MY CLASSES*/}
                    {/*                </Dropdown.Item>*/}
                    {/*            </Dropdown.Menu>*/}
                    {/*        </div>*/}
                    {/*    </Dropdown>*/}
                    {/*</div>*/}
                    <Pagination postsPerPage={postsPerPage} totalPosts={classes.length} paginate={paginate}
                                nextPage={nextPage} prevPage={prevPage}/>
                </div>
            </>

        )
    }

}

export default Classes;