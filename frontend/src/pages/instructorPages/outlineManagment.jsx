import { useEffect, useState } from "react";

const OutlineManagment = () => {

    const [serverFinished, setServerFinished] = useState(false);
    const [outlines, setOutlines] = useState([]);

    useEffect(() => {
        //Insert axios method here to get all outlines that belong to a professor
    }, []);

    return (
        <div>
            <button>New</button>
        </div>
    );
}

export default OutlineManagment;