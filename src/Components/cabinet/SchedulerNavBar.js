import React, {useCallback, useRef, useState} from "react";
import {Button, Modal, Row, Tab, Tabs} from "react-bootstrap";
import SchedulerAllClass from "./SchedulerAllClass";
import SchedulerMyClass from "./SchedulerMyClass";
import "./Scheduler.css";
import {useDropzone} from 'react-dropzone'
import * as axios from "axios";

function MyVerticallyCenteredModal(props) {
    const [file, setFile] = useState([]);
    const [changedFile, setChangedFile] = useState(false);
    const [description, setDescription] = useState([]);
    const [title, setTitle] = useState([]);
    const [startTime, setStartTime] = useState([]);
    const [startDate, setStartDate] = useState([]);
    const [finishTime, setFinishTime] = useState([]);
    const [finishDate, setFinishDate] = useState([]);
    const [validation, setValidation] = useState(false);
    const [classForPhoto, setClassForPhoto] = useState();
    const inputEl = useRef(null);

    const setPhoto = async (e) => {
        e.preventDefault();

        console.log("in setPhoto");
        console.log(file);
        console.log(classForPhoto)
        console.log(changedFile)

        if (changedFile) {
            const data = new FormData();
            data.append('file', file)
            data.append('id', classForPhoto)
            console.log("in Setter");
            const token = localStorage.getItem("token");
            const options = {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + token,
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "multipart/form-data",
                    "Accept": "*/*"
                },
                data: data,
                url: 'http://localhost:8091/class-management/class-image'
            };
            const response = await axios(options);
            setChangedFile(false)
            console.log(response.data)
            return response;
        }
    }
    const formValidator = async (e) => {
        if (title.length > 0 && startDate.length > 0 && startTime.length > 0 && finishDate.length > 0 && finishTime.length > 0) {
            setValidation(true);
        }
    }

    const createClass = async (e) => {
        e.preventDefault();
        await formValidator(e);

        if (validation) {
            const token = localStorage.getItem("token");
            const options = {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + token,
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json'

                },
                data: {
                    'name': title,
                    'startTime': startDate + "T" + startTime + ":00+02:00",
                    'finishTime': finishDate + "T" + finishTime + ":00+02:00",
                    'description': description.length > 0 ? description : ""
                },
                url: 'http://localhost:8091/class-management/class'
            };
            const response = await axios(options);
            setValidation(false);
            console.log(response.data.id);
            await setClassForPhoto(response.data.id)
            setPhoto(e);
            return response;
        }
    }
    const onUpload = async (e) => {
        e.preventDefault();
        setFile(inputEl.current.files[0]);
        setChangedFile(true);
        console.log(file);
    }
    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles);
        setChangedFile(true)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Class
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className={"create-class-form"}>
                    <Row className={"special-row"}>
                        {/*<div {...getRootProps()} className={"dropzone-container"}>*/}
                        {/*    <input {...getInputProps()} />*/}
                        {/*    {*/}
                        {/*        isDragActive ?*/}
                        {/*            <p>Drop the files here ...</p> :*/}
                        {/*            <p>Upload image</p>*/}
                        {/*    }*/}
                        {/*</div>*/}
                        <label htmlFor="filePicker">
                            Upload new photo
                        </label>
                        <input id="filePicker" style={{visibility: "hidden"}} ref={inputEl} type={"file"}
                               onChange={(e) => onUpload(e)}/>
                    </Row>
                    <Row>
                        <span>Title</span><input placeholder={"Add Yor Class Title"}
                                                 onChange={e => setTitle(e.target.value)}/>
                    </Row>
                    <Row>
                        <span>Date</span>
                        <div className={"date-container"}><input className={"date-input"} type={"date"}
                                                                 onChange={e => setStartDate(e.target.value)}/>-<input
                            className={"date-input"} type={"date"} onChange={e => setFinishDate(e.target.value)}/></div>
                    </Row>
                    <Row>
                        <span>Start Time</span><input placeholder={"Select Start Time"} type={"time"}
                                                      onChange={e => setStartTime(e.target.value)}/>
                    </Row>
                    <Row>
                        <span>Finish Time</span><input placeholder={"Select Finish Time"} type={"time"}
                                                       onChange={e => setFinishTime(e.target.value)}/>
                    </Row>
                    <Row>
                        <span>Description</span>
                        <textarea className={"description-container"}
                                  placeholder={"Add Yor Class Description"}
                                  onChange={e => setDescription(e.target.value)}/>
                    </Row>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(e) => {
                    createClass(e);
                    // setPhoto(e)
                }} className={"form-button"}>Create Class</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default function Scheduler() {

    const [key, setKey] = useState("allClasses");
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="primary" className={"button-create-class"} onClick={() => setModalShow(true)}>
                Create Class
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}>

                <Tab eventKey="allClasses" title="ALL CLASSES">
                    <SchedulerAllClass/>
                </Tab>
                <Tab eventKey="myClasses" title="MY CLASSES">
                    <SchedulerMyClass/>
                </Tab>
            </Tabs>
        </>
    );
}