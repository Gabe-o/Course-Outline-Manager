import { useState } from "react";

const Topic = ({ topic, topicsList, topicsListSetter }) => {

    const [topicValue, setTopicValue] = useState(topic);
    const [descriptionValue, setDescriptionValue] = useState("");
    const [indicatorValue, setIndicatorValue] = useState("");
    const [points, setPoints] = useState([]);
    const [addingPoints, setAddingPoints] = useState(false);
    const [saving, setSaving] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedPoints, setEditedPoints] = useState([]);

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
        setSaving(false);
        setCancelling(false);
        setEditing(false);
        setDescriptionValue("");
        setIndicatorValue("");
    }

    const cancelPoints = () => {
        setCancelling(true);
        setSaving(false);
        setAddingPoints(false);
        setEditing(false);
        setDescriptionValue("");
        setIndicatorValue("");
    }

    const savePoints = () => {
        setSaving(true);
        setCancelling(false);
        setAddingPoints(false);
        setEditing(false);
        const point = {
            description: descriptionValue,
            indicator: indicatorValue,
        }
        setPoints([...points, point]);
    }

    const deleteTopic = () => {
        topicsListSetter(topicsList.filter(element => element !== topic));
    }

    const editTopic = () => {
        setEditing(true);
        setSaving(false);
        setCancelling(false);
        setAddingPoints(false);
    }

    const saveEditChanges = () => {
        if (topicValue !== topic) {
            if (topicsList.indexOf(topic) !== -1) {
                topicsList[topicsList.indexOf(topic)] = topicValue;
                topicsListSetter(topicsList);
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
        }
        setEditing(false);
        setPoints(points);
        setEditedPoints([]);
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