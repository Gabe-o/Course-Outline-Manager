import { useEffect, useState } from "react";
<<<<<<< HEAD
import user from "../../user";
import Outline from "../../components/outlineManagment/outline";
import axios from "axios";
=======
>>>>>>> main

const OutlineManagment = () => {

    const [serverFinished, setServerFinished] = useState(false);
    const [outlines, setOutlines] = useState([]);

    useEffect(() => {
<<<<<<< HEAD
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
=======
        //Insert axios method here to get all outlines that belong to a professor
    }, []);

    return (
        <div>
            <button>New</button>
        </div>
>>>>>>> main
    );
}

export default OutlineManagment;