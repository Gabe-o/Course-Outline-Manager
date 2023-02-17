import { useEffect, useState } from "react";
import user from "../../user";
import Outline from "../../components/outlineManagment/outline";
import axios from "axios";

const OutlineManagment = () => {

    const [serverFinished, setServerFinished] = useState(false);
    const [outlines, setOutlines] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/api/outline?userID=" + user().userID)
            .then(res => {
                setOutlines(res.data);
            })
            .catch(err => {
                alert(JSON.stringify(err));
            })
    }, []);

    const newOutline = () => {

    }



    return (
        <>
            <div>
                <button>New</button>
            </div>
            <div>
                {outlines ? outlines.map((outline) => <Outline courseID={outline.courseID} term={outline.term} status={outline.status} />) : ""}
            </div>
        </>
    );
}

export default OutlineManagment;