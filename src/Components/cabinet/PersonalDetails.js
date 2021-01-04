import React, {useEffect, useState, useRef} from "react";
import '../registration/RegisterService.js'
import "./PersonalDetails.css";
import defaultPhoto from "./image/web-user.jpeg";
import * as axios from "axios";
import {Col} from "react-bootstrap";


export default function PersonalDetails() {
    const [file, setFile] = useState([])
    const [changedFile, setChangedFile] = useState([])
    const [allName, setAllName] = useState([])
    const [changedAllName, setChangedAllName] = useState([])
    const [email, setEmail] = useState([])
    const [changedEmail, setChangedEmail] = useState([])
    const [description, setDescription] = useState([])
    const [changedDescription, setChangedDescription] = useState([])
    const [userProfiles, setUserProfiles] = useState([])
    const [userPhoto, setUserPhoto] = useState([])
    const inputEl = useRef(null);

    useEffect(() => {
        getUser();
        getPhoto();
    }, [])

    const getPhoto = async () => {
        setUserPhoto(null);
        const token = localStorage.getItem("token");
        const options = {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token,
                "Access-Control-Allow-Origin": "*"
            },
            url: 'http://localhost:8091/class-management/image'
        };
        const response = await axios(options);
        setUserPhoto(response.data);
        return response;
    }

    const deletePhoto = async (e) => {
        e.preventDefault();
        setUserPhoto(null);
        console.log("Del")
        const token = localStorage.getItem("token");
        const options = {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token,
                "Access-Control-Allow-Origin": "*"
            },
            url: 'http://localhost:8091/class-management/image'
        };
        const response = await axios(options);
        setUserPhoto(response.data);
        return response;
    }



    const editUser = async (e) => {
        e.preventDefault();
        if (changedEmail || changedAllName) {
            const token = localStorage.getItem("token");
            const options = {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + token,
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json'
                },
                data: {'allName': allName, 'email': email},
                url: 'http://localhost:8090/user-management/edit-user'
            };
            const response = await axios(options);
            console.log(response.data);
            return response;
        }
    }

    const editDescription = async (e) => {
        e.preventDefault();
        if (changedEmail || changedAllName || changedDescription) {
            const token = localStorage.getItem("token");
            const options = {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + token,
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json'

                },
                data: {
                    'allName': allName,
                    'email': email,
                    'description': description.length > 0 ? description : "Student"
                },
                url: 'http://localhost:8091/class-management/edit-user'
            };
            const response = await axios(options);
            setChangedAllName(false);
            setChangedEmail(false);
            setChangedDescription(false);
            console.log(response.data);
            return response;
        }
    }
    const getUser = async () => {
        const token = localStorage.getItem("token");
        const options = {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With",
            },
            url: 'http://localhost:8091/class-management/user'
        };
        const response = await axios(options);
        setUserProfiles(response.data)
        setAllName(response.data.name + " " + response.data.lastName);
        setEmail(response.data.email);
        setDescription(response.data.description);
        console.log(response.data)
        return response;
    }
    const setPhoto = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', file)
        if (changedFile) {
            console.log("in Setter");
            const token = localStorage.getItem("token");
            const options = {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + token,
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "multipart/form-data",
                    "Accept":"*/*"
                },
                data: data,
                url: 'http://localhost:8091/class-management/image'
            };
            const response = await axios(options);
            setChangedFile(false)
            console.log("It is end of setter"+response.data)
            return response;
        }
    }
    const onUpload = async (e) => {
        e.preventDefault();
        setFile(inputEl.current.files[0]);
        console.log(file);
    }

    return (
        <div className={"settings-container"}>
            <h2>Personal details</h2>
            <a>This section contains your basic profile information.</a>
            <div className={"photo-settings"}>
                <img className={"avatar"}
                     src={userPhoto == null ? defaultPhoto : `data:image/jpeg;base64,${userPhoto}`}/>
                <form>
                    <div className={"buttons-container"}>
                        <div className={"buttons"}>
                            <label htmlFor="filePicker">
                                Upload new photo
                            </label>
                            <input id="filePicker" style={{visibility: "hidden"}} ref={inputEl} type={"file"} onChange={(e)=>onUpload(e)}/>
                            <button  onClick={(e)=>deletePhoto(e)} type={"submit"}>
                                Delete Photo
                            </button>
                        </div>
                        <a>
                            You can upload .jpeg, .png, .gif image format files.<br/>
                            Max image size 3mb.
                        </a>
                    </div>
                </form>
            </div>
            <div className={"name-settings"}>
                <form>
                    <Col sm={12}>
                        <Col sm={6}>
                            <label>YOUR NAME</label>
                            <input type="text" name='name'
                                   placeholder={userProfiles.name + " " + userProfiles.lastName}
                                   onChange={(e) => {
                                       setAllName(e.target.value);
                                       setChangedAllName(true)
                                   }}/>
                        </Col>
                        <Col sm={6} className={"column-padding"}>
                            <label>EMAIL ADDRESS</label>
                            <input type="text" name='email'
                                   placeholder={userProfiles.email} onChange={(e) => {
                                setEmail(e.target.value);
                                setChangedEmail(true)
                            }}/>
                        </Col>
                    </Col>
                    <Col sm={12} className={"column-flex-direction"}>
                        <label>description</label>
                        <textarea name='description'
                                  placeholder={description}
                                  onChange={e => setDescription(e.target.value)}/>
                        <button type={"submit"} className={"button-save back-color"} onClick={(e) => {
                            setPhoto(e);
                            editUser(e);
                            editDescription(e);
                        }}>
                            Save Changes
                        </button>
                    </Col>

                </form>
            </div>
        </div>

    );

}