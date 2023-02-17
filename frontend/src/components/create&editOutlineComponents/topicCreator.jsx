import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from "axios";
import cookies from "js-cookie";
import Topic from './topic';

const TopicCreator = ({ sectionLabel, outlineID }) => {

    const [value, setValue] = useState("");
    const [topics, setTopics] = useState([]);
    const [addingTopic, setAddingTopic] = useState(false);
    const [savingTopic, setSavingTopic] = useState(false);
    const [cancellingTopic, setCancellingTopic] = useState(false);
    const [lastMod, setLastMod] = useState();

    useEffect(() => {
        axios.get("http://localhost:9000/api/modification?outlineID=" + outlineID + "&section=" + sectionLabel + "&newest=true", { headers: { "token": cookies.get("jwt") } })
            .then(res => {
                setLastMod(res.data[0]);
                setTopics(JSON.parse(res.data[0].content));
            })
            .catch(err => {

            })
    }, [addingTopic]);

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
            outlineID: outlineID,
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
            <p id='lastEdit'>Last Edited: {lastMod ? lastMod.authorID + " " + moment(lastMod.dateTime).format("YYYY-MM-DD HH:mm:ss") : ""}</p>
            {addingTopic ? <div><input value={value} placeholder="Enter a topic name" onChange={(event) => setValue(event.target.value)} /><button onClick={saveTopic}>Save</button><button onClick={cancelTopic}>Cancel</button></div> : ""}
            {topics.map((topic, i) => <Topic topic={topic} topicsList={topics} topicsListSetter={setTopics} setAddingTopic={setAddingTopic} sectionLabel={sectionLabel + " " + topic} outlineID={outlineID} key={i} />)}
        </div>
    );
};

export default TopicCreator;