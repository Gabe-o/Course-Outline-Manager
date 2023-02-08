import React, { useState } from "react";

const evaluations = ["Homework Assignments", "Quizzes", "Laboratory", "Midterm Test", "Final Examinations"];

const Evaluation = () => {

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

    const handleAddOption = () => {
        setShowTextbox(true);
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
        setShowAddEvaluation(true);
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
    }

    const handleAddWeight = () => {
        setAddSection(false);
        console.log(evaluation);
        const assessment = {
            evaluation: evaluation,
            weight: weight,
        }
        breakdown.push(assessment);
        setBreakdown(breakdown);
        console.log(breakdown);
        setWeight("0");
        setEvaluation("Homework Assignments");
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
            {showAddEvaluation && (
                <div>
                    <div>
                        {options.filter((option) => !evaluations.includes(option)).map((option) => (
                            <div key={option}>
                                <p>{option}</p>
                                <button onClick={() => handleDeleteOption(option)}>Delete</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleCloseAddEvaluation}>Close</button>
                </div>
            )}

            <button onClick={handleAddSection}>Add Section</button>
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
            {breakdown.length > 0 ? breakdown.map(element => <p>{element.evaluation + " " + element.weight}</p>) : ""}
        </div>
    );
};

export default Evaluation;