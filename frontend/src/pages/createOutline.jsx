import { React } from "react";
import Textbox from "../components/textbox";
import Counter from "../components/counter";
import Switch from "../components/creditsSwitch";
import LearningObjectivesDropdown from "../components/learningObjectivesDropdown";
import TopicCreator from "../components/topicCreator";
import Evaluation from "../components/evaluation";

const CreateOutline = () => {
    return (
        <div>
            <h1>Description</h1>
            <Textbox />
            <h1>Instructor</h1>
            <h3>Name</h3>
            <Textbox />
            <h3>Phone Number</h3>
            <Textbox />
            <h3>Extension</h3>
            <Textbox />
            <h3>UWO Email</h3>
            <Textbox />
            <h3>Consulation Hours</h3>
            <Textbox />
            <h1>Acedemic Calender Copy</h1>
            <h1>Contact Hours</h1>
            <h3>Lecture Hours</h3>
            <Counter />
            <h3>Labratory Hours</h3>
            <Counter />
            <h3>Tutorial Hours</h3>
            <Counter />
            <h3>Credits</h3>
            <Switch />
            <h1>Antirequisite</h1>
            <Textbox />
            <h1>Prerequisites</h1>
            <Textbox />
            <h1>Co-requisite</h1>
            <Textbox />
            <h1>CEAB Academic Units</h1>
            <h3>Engineering Science %</h3>
            <Textbox />
            <h3>Engineering Design %</h3>
            <Textbox />
            <h1>Required Textbook</h1>
            <Textbox />
            <h1>Other Required References</h1>
            <Textbox />
            <h1>Recommended References</h1>
            <Textbox />
            <h1>General Learning Objectives (CEAB)</h1>
            <h3>Use of Engineering Tools</h3>
            <LearningObjectivesDropdown />
            <h5>Comments</h5>
            <Textbox />
            <h3>Impact on Society and the Environment</h3>
            <LearningObjectivesDropdown />
            <h5>Comments</h5>
            <Textbox />
            <h3>Problem Analysis</h3>
            <LearningObjectivesDropdown />
            <h5>Comments</h5>
            <Textbox />
            <h3>Individual and Team Work</h3>
            <LearningObjectivesDropdown />
            <h5>Comments</h5>
            <Textbox />
            <h3>Ethics and Equity</h3>
            <LearningObjectivesDropdown />
            <h5>Comments</h5>
            <Textbox />
            <h3>Investigation</h3>
            <LearningObjectivesDropdown />
            <h5>Comments</h5>
            <Textbox />
            <h3>Communication Skills</h3>
            <LearningObjectivesDropdown />
            <h5>Comments</h5>
            <Textbox />
            <h3>Economics and Project Management</h3>
            <LearningObjectivesDropdown />
            <h5>Comments</h5>
            <Textbox />
            <h3>Design</h3>
            <LearningObjectivesDropdown />
            <h5>Comments</h5>
            <Textbox />
            <h3>Professionalism</h3>
            <LearningObjectivesDropdown />
            <h5>Comments</h5>
            <Textbox />
            <h3>Life-Long Learning</h3>
            <LearningObjectivesDropdown />
            <h5>Comments</h5>
            <Textbox />
            <h1>Topics</h1>
            <TopicCreator />
            <h1>Evaluation</h1>
            <Evaluation />
            <h3>Evaluation Description</h3>
            <Textbox />
            <h1>Late Submission Policy</h1>
            <Textbox />
            <h1>Assignment Submission Locker</h1>
            <Textbox />
            <h1>Use of English</h1>
            <Textbox />
            <h1>Attendance</h1>
            <Textbox />
            <h1>Absence Due to Illnes or Other Circumstances</h1>
            <Textbox />
            <h1>Missed Midterm Examinations</h1>
            <Textbox />
            <h1>Cheating and Plagiarism</h1>
            <Textbox />
            <h1>Use of Electronic Devices</h1>
            <Textbox />
            <h1>Use of Personal Response Devices ("Clickers")</h1>
            <Textbox />
            <h1>Policy on Repating All Components of a Course</h1>
            <Textbox></Textbox>
            <h1>Internet and Electronic Mail</h1>
            <Textbox />
            <h1>Accessibility</h1>
            <Textbox />
            <button>Submit</button>
        </div>
    )
}

export default CreateOutline;

