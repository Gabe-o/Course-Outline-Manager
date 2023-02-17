import { useEffect, useState } from "react";
import user from "../../user";
import OutlineSelector from "../../components/outlineManagment/outlineSelector";
import axios from "axios";

const OutlineManagment = () => {

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
            <div>
                {outlines.length > 0 ? outlines.map((outline) => <OutlineSelector outlineID={outline.outlineID} courseID={outline.courseID} term={outline.term} status={outline.status} />) : <p>You have no currently assigned outlines</p>}
            </div>
        </>
    );
}

export default OutlineManagment;