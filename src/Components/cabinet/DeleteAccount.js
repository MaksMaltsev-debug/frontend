import React from "react";
import * as axios from "axios";
import "./PersonalDetails.css"

export default function DeleteAccount() {

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const options = {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token,
                "Access-Control-Allow-Origin": "*"
            },
            url: 'http://localhost:8091/class-management/user'
        };
        const response = await axios(options);
        console.log(response);
    }

    return (
        <div className={"content-container"}>
            <div className={"settings-container"}>
                <div className={"name-settings"}>
                    <h2>Delete Account</h2>
                    <a>If you delete your account, your data will be gone forever.</a>
                    <div>
                        <button className={"back-color delete-button"} onClick={(e) => handleDeleteAccount(e)}
                                variant="primary">Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>)
}
