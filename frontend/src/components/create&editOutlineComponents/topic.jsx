import { useEffect, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import moment from "moment";

const Topic = ({ topic, topicsList, topicsListSetter, setAddingTopic, sectionLabel, outlineID }) => {

    const [topicValue, setTopicValue] = useState(topic);
    const [descriptionValue, setDescriptionValue] = useState("");
    const [indicatorValue, setIndicatorValue] = useState("");
    const [points, setPoints] = useState([]);
    const [addingPoints, setAddingPoints] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedPoints, setEditedPoints] = useState([]);
    const [lastMod, setLastMod] = useState();

    useEffect(() => {
        axios.get("http://localhost:9000/api/modification?outlineID=" + outlineID + "&section=" + sectionLabel + "&newest=true", { headers: { "token": cookies.get("jwt") } })
            .then(res => {
                setLastMod(res.data[0]);
                setPoints(JSON.parse(res.data[0].content));
            })
            .catch(err => {

            })
    }, [addingPoints, editing]);

    const initialValues = points.map(point => ({
        description: point.description,
        indicator: point.indicator,
    }));

    const handleDescriptionChange = (i, event) => {
        setEditedPoints({
            ...editedPoints,
            [i]: {
                ...editedPoints[i],
                description: event.target.value,
            }
        });
    };

    const handleIndicatorChange = (i, event) => {
        setEditedPoints({
            ...editedPoints,
            [i]: {
                ...editedPoints[i],
                indicator: event.target.value,
            }
        });
    };

    const addPoints = () => {
        setAddingPoints(true);
        setEditing(false);
        setDescriptionValue("");
        setIndicatorValue("");
    }

    const cancelPoints = () => {
        setAddingPoints(false);
        setEditing(false);
        setDescriptionValue("");
        setIndicatorValue("");
    }

    const savePoints = () => {
        setAddingPoints(false);
        setEditing(false);
        const point = {
            description: descriptionValue,
            indicator: indicatorValue,
        }
        setPoints([...points, point]);

        axios.post("http://localhost:9000/api/modification", {
            dateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            section: sectionLabel,
            content: JSON.stringify([...points, point]),
            comment: null,
            outlineID: outlineID,
        }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
            .catch(err => {
                alert(JSON.stringify(err.response.data));
            });
    }

    const deleteTopic = () => {
        topicsListSetter(topicsList.filter(element => element !== topic));

        // Clear points for this topic
        console.log(sectionLabel + " " + null + " " + moment().format("YYYY-MM-DD HH:mm:ss"));
        axios.post("http://localhost:9000/api/modification", {
            dateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            section: sectionLabel,
            content: null,
            comment: null,
            outlineID: outlineID,
        }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
            .catch(err => {
                alert(JSON.stringify(err.response.data));
            });

        // remove topic from list of topics
        console.log(sectionLabel.split(" ")[0] + " " + JSON.stringify(topicsList.filter(element => element !== topic)) + " " + moment().format("YYYY-MM-DD HH:mm:ss"));
        axios.post("http://localhost:9000/api/modification", {
            dateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            section: sectionLabel.split(" ")[0],
            content: JSON.stringify(topicsList.filter(element => element !== topic)),
            comment: null,
            outlineID: outlineID,
        }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
            .catch(err => {
                alert(JSON.stringify(err.response.data));
            });
    }

    const editTopic = () => {
        setEditing(true);
        setAddingPoints(false);
        setAddingTopic(true);
    }

    const saveEditChanges = () => {
        if (topicValue !== topic) {
            if (topicsList.indexOf(topic) !== -1) {
                let newTopicsList = topicsList.slice();
                newTopicsList[topicsList.indexOf(topic)] = topicValue;
                topicsListSetter(newTopicsList);

                // Clear points for old topic name
                axios.post("http://localhost:9000/api/modification", {
                    dateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                    section: sectionLabel,
                    content: null,
                    comment: null,
                    outlineID: outlineID,
                }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
                    .catch(err => {
                        alert(JSON.stringify(err.response.data));
                    });
                // Change topic name in topic list
                axios.post("http://localhost:9000/api/modification", {
                    dateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                    section: sectionLabel.split(" ")[0],
                    content: JSON.stringify(newTopicsList),
                    comment: null,
                    outlineID: outlineID,
                }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
                    .catch(err => {
                        alert(JSON.stringify(err.response.data));
                    });
                // Add old points to new topic name
                axios.post("http://localhost:9000/api/modification", {
                    dateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                    section: sectionLabel.split(" ")[0] + " " + topicValue,
                    content: JSON.stringify(points),
                    comment: null,
                    outlineID: outlineID,
                }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
                    .catch(err => {
                        alert(JSON.stringify(err.response.data));
                    });
            }
        }

        if (editedPoints.length != 0) {
            for (let i = 0; i < initialValues.length; i++) {
                if (initialValues[i].description !== (editedPoints[i].description ? editedPoints[i].description : initialValues[i].description)) {
                    points[i].description = editedPoints[i].description;
                }

                if (initialValues[i].indicator !== (editedPoints[i].indicator !== undefined ? editedPoints[i].indicator : initialValues[i].indicator)) {
                    points[i].indicator = editedPoints[i].indicator;
                }
            }

            axios.post("http://localhost:9000/api/modification", {
                dateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                section: sectionLabel.split(" ")[0] + " " + topicValue,
                content: JSON.stringify(points),
                comment: null,
                outlineID: outlineID,
            }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
                .catch(err => {
                    alert(JSON.stringify(err.response.data));
                });
        }
        setEditing(false);
        setPoints(points);
        setEditedPoints([]);
        setAddingTopic(false);

    }

    const cancelEditChanges = () => {
        setEditing(false);
    }

    const intToLetter = (num) => {
        return String.fromCharCode(97 + num);
    }

    return (
        <div>
            <h5>{topicValue}</h5>
            <button onClick={addPoints}>Add Points</button>
            <button onClick={deleteTopic}>Delete</button>
            <button onClick={editTopic}>Edit</button>
            <p id='lastEdit'>Last Edited: {lastMod ? lastMod.authorID + " " + moment(lastMod.dateTime).format("YYYY-MM-DD HH:mm:ss") : ""}</p>
            {points.length > 0 ? points.map((point, i) => <p><b>{intToLetter(i) + ") "}</b>{point.description + " " + point.indicator}</p>) : ""}
            {addingPoints ?
                <div>
                    <input value={descriptionValue} placeholder="Enter Description" onChange={(event) => setDescriptionValue(event.target.value)} />
                    <input value={indicatorValue} placeholder="Enter GA Indicator" onChange={(event) => setIndicatorValue(event.target.value)} />
                    <button onClick={savePoints}>Save</button>
                    <button onClick={cancelPoints}>Cancel</button>
                </div> : ""}
            {editing ?
                <div>
                    <input defaultValue={topic} placeholder="Edit Topic Name" onChange={(event) => setTopicValue(event.target.value)} />
                    <br />
                    {points.length > 0 ? points.map((point, i) =>
                        <div>
                            <label><b>{intToLetter(i) + ") "}</b></label>
                            <input defaultValue={point.description} placeholder="Edit Description" onChange={(event) => handleDescriptionChange(i, event)} />
                            <input defaultValue={point.indicator} placeholder="Edit GA Indicator" onChange={(event) => handleIndicatorChange(i, event)} />
                        </div>) : ""}
                    <button onClick={saveEditChanges}>Save</button>
                    <button onClick={cancelEditChanges}>Cancel</button>
                </div> : ""}
        </div>
    );
}

export default Topic;