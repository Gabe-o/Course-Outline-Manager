import { useEffect, useState } from "react";
import user from "../../user";
import Outlines from "../../pages/adminPages/outlines.jsx";
import axios from "axios";
import "../../styles/outlines.css";

const OutlineManagement = () => {

    const [outlines, setOutlines] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/api/outline?userID=" + user().userID)
            .then(res => {
                setOutlines(res.data);
            })
            .catch(err => {
                if (err.response.status !== 404) {
                    alert(JSON.stringify(err.response.data));
                }
            })
    }, []);

    return (
        <>
            <div className="page">
                <div className="document-list">
                    {outlines.length > 0 ? outlines.map((outline, index) => (
                        <Outlines key={index} outlineID={outline.outlineID} courseID={outline.courseID} term={outline.term} status={outline.status} />
                    )) : <p>You have no currently assigned outlines</p>}
                </div>
            </div>
        </>
    );
}

export default OutlineManagement;