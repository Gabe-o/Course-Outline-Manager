import React, { useEffect, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import moment from 'moment';
import EvaluationDescription from "./evalutationDescription";

const evaluations = ["Homework Assignments", "Quizzes", "Laboratory", "Midterm Test", "Final Examinations"];

const Evaluation = ({ sectionLabel, outlineID }) => {

    const [options, setOptions] = useState(evaluations);
    const [showTextbox, setShowTextbox] = useState(false);
    const [showAddEvaluation, setShowAddEvaluation] = useState(false);
    const [newOption, setNewOption] = useState("");
    const [addSection, setAddSection] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [addWeight, setAddWeight] = useState(false);
    const [evaluation, setEvaluation] = useState("Homework Assignments");
    const [weight, setWeight] = useState("0");
    const [breakdown, setBreakdown] = useState([]);
    const [lastMod, setLastMod] = useState();

    useEffect(() => {
        axios.get("http://localhost:9000/api/modification?outlineID=" + outlineID + "&section=" + sectionLabel + "&newest=true", { headers: { "token": cookies.get("jwt") } })
            .then(res => {
                setLastMod(res.data[0]);
                setBreakdown(JSON.parse(res.data[0].content));
            })
            .catch(err => {

            })
    }, [addSection]);

    const handleAddOption = () => {
        setShowTextbox(true);
        setShowAddEvaluation(false);
        setAddSection(false);
    };

    const handleSaveOption = () => {
        setOptions([...options, newOption]);
        setShowTextbox(false);
        setNewOption("");
    };

    const handleCancelOption = () => {
        setShowTextbox(false);
        setNewOption("");
    };

    const handleRemoveOption = () => {
        setShowTextbox(false);
        setShowAddEvaluation(true);
        setAddSection(false);

    };

    const handleCloseAddEvaluation = () => {
        setShowAddEvaluation(false);
    };

    const handleDeleteOption = (optionToRemove) => {
        setOptions(options.filter((option) => option !== optionToRemove));
        setShowAddEvaluation(false);
    };

    const handleAddSection = () => {
        setAddSection(true);
        setCancel(false);
        setShowTextbox(false);
        setShowAddEvaluation(false);
    }

    const handleRemoveSection = (section) => {
        setAddSection(true);
        setBreakdown(breakdown.filter((e) => e !== section));

        // Updated mark breakdown
        axios.post("http://localhost:9000/api/modification", {
            dateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            section: sectionLabel,
            content: JSON.stringify(breakdown.filter((e) => e !== section)),
            comment: null,
            outlineID: outlineID,
        }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
            .then(res => {
                setAddSection(false);
            })
            .catch(err => {
                alert(JSON.stringify(err.response.data));
            });
    }

    const handleAddWeight = () => {
        setAddSection(false);
        const assessment = {
            evaluation: evaluation,
            weight: weight,
        }
        breakdown.push(assessment);
        setBreakdown(breakdown);
        setWeight("0");
        setEvaluation("Homework Assignments");

        axios.post("http://localhost:9000/api/modification", {
            dateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            section: sectionLabel,
            content: JSON.stringify(breakdown),
            comment: null,
            outlineID: outlineID,
        }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
            .catch(err => {
                alert(JSON.stringify(err.response.data));
            });
    }

    const handleCancel = () => {
        setAddSection(false);
        setCancel(true)
    }

    return (
        <div>
            <ul>
                {options.map((option) => (
                    <li key={option}>{option}</li>
                ))}
            </ul>
            <button onClick={handleAddOption}>Add Evaluation</button>
            <button onClick={handleRemoveOption}>Remove Evaluation</button>
            {showTextbox && (
                <div>
                    <input type="text" value={newOption} onChange={(event) => setNewOption(event.target.value)} />
                    <button onClick={handleSaveOption}>Save</button>
                    <button onClick={handleCancelOption}>Cancel</button>
                </div>
            )}
            {showAddEvaluation && (options.length > 5 ?
                <div>

                    <div>
                        {options.filter((option) => !evaluations.includes(option)).map((option) => (
                            <div key={option}>
                                <p>{option}</p>
                                <button onClick={() => handleDeleteOption(option)}>Delete</button>
                                <button onClick={handleCloseAddEvaluation}>Close</button>
                            </div>
                        ))}
                    </div>

                </div>
                : setShowAddEvaluation(false)
            )}

            <button onClick={handleAddSection}>Add Weight</button>
            <p id='lastEdit'>Last Edited: {lastMod ? lastMod.authorID + " " + moment(lastMod.dateTime).format("YYYY-MM-DD HH:mm:ss") : ""}</p>
            {addSection ? <div>
                <select value={evaluation} onChange={(event) => setEvaluation(event.target.value)}>
                    {options.map((option) => (
                        <option key={option}>{option}</option>
                    ))}
                </select>
                <input value={weight} placeholder="Enter Weight in %" onChange={(event) => setWeight(event.target.value)} />
                <button onClick={handleAddWeight}>Add</button>
                <button onClick={handleCancel}>Cancel</button>
            </div> : ""}
            {breakdown.length > 0 ? breakdown.map(element => <><p>{element.evaluation + " " + element.weight} <button onClick={() => handleRemoveSection(element)}>Remove</button></p></>) : ""}

            <h3>Evaluations Descriptions</h3>

            {options.map((option, i) => (<EvaluationDescription evaluation={option} sectionLabel={sectionLabel + " " + option} outlineID={outlineID} key={i} />))}

        </div>
    )
};

export default Evaluation;