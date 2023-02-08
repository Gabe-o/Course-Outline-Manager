import React, { useState } from 'react';
import Topic from './topic';

const TopicCreator = () => {

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
            {topics.map((topic, i) => <Topic topic={topic} topicsList={topics} topicsListSetter={setTopics} key={i} />)}
        </div>
    );
};

export default TopicCreator;