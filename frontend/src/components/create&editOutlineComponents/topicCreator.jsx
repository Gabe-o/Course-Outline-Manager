import React, { useState } from 'react';
import moment from 'moment';
import axios from "axios";
import cookies from "js-cookie";
import Topic from './topic';

const TopicCreator = ({ sectionLabel }) => {

    const [value, setValue] = useState("");
    const [topics, setTopics] = useState([]);
    const [addingTopic, setAddingTopic] = useState(false);
    const [savingTopic, setSavingTopic] = useState(false);
    const [cancellingTopic, setCancellingTopic] = useState(false);

    const addTopic = () => {
        setAddingTopic(true);
        setSavingTopic(false);
        setCancellingTopic(false);
    }

    const saveTopic = () => {
        setAddingTopic(false);
        setSavingTopic(true);
        setCancellingTopic(false);
        setTopics([...topics, value]);
        setValue("");

        console.log(sectionLabel + " " + JSON.stringify([...topics, value]) + " " + moment().format("YYYY-MM-DD hh:mm:ss"));
        axios.post("http://localhost:9000/api/modification", {
            dateTime: moment().format("YYYY-MM-DD hh:mm:ss"),
            section: sectionLabel,
            content: JSON.stringify([...topics, value]),
            comment: null,
            outlineID: 0,
        }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
            .catch(err => {
                alert(JSON.stringify(err.response.data));
            });
    }

    const cancelTopic = () => {
        setAddingTopic(false);
        setCancellingTopic(true);
        setSavingTopic(false);
        setValue("");
    }

    return (
        <div>
            <h5>Add Topic</h5>
            <button onClick={addTopic}>+</button>
            {addingTopic ? <div><input value={value} placeholder="Enter a topic name" onChange={(event) => setValue(event.target.value)} /><button onClick={saveTopic}>Save</button><button onClick={cancelTopic}>Cancel</button></div> : ""}
            {topics.map((topic, i) => <Topic topic={topic} topicsList={topics} topicsListSetter={setTopics} sectionLabel={sectionLabel + " " + topic} key={i} />)}
        </div>
    );
};

export default TopicCreator;