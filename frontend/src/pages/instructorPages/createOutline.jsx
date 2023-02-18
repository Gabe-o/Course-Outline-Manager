import { React } from "react";
import Textbox from "../../components/create&editOutlineComponents/textbox";
import Counter from "../../components/create&editOutlineComponents/counter";
import Switch from "../../components/create&editOutlineComponents/creditsSwitch";
import TopicCreator from "../../components/create&editOutlineComponents/topicCreator";
import Evaluation from "../../components/create&editOutlineComponents/evaluation";
import LearningObjective from "../../components/create&editOutlineComponents/learningObjective";
import { useLocation } from "react-router-dom";

const CreateOutline = () => {

    const location = useLocation();

    return (
        <div>
            <h1></h1>
            <h1>Description</h1>
            <Textbox sectionLabel={"Description"} outlineID={location.state} />
            <h1>Instructor</h1>
            <h3>Name</h3>
            <Textbox sectionLabel={"InstructorName"} outlineID={location.state} />
            <h3>Phone Number</h3>
            <Textbox sectionLabel={"InstructorPhoneNumber"} outlineID={location.state} />
            <h3>Extension</h3>
            <Textbox sectionLabel={"InstructorPhoneExtension"} outlineID={location.state} />
            <h3>UWO Email</h3>
            <Textbox sectionLabel={"InstructorEmail"} outlineID={location.state} />
            <h3>Consulation Hours</h3>
            <Textbox sectionLabel={"InstructorConsultationHours"} outlineID={location.state} />
            <h1>Acedemic Calender Copy</h1>
            <h1>Contact Hours</h1>
            <h3>Lecture Hours</h3>
            <Counter sectionLabel={"LectureHours"} outlineID={location.state} />
            <h3>Labratory Hours</h3>
            <Counter sectionLabel={"LabHours"} outlineID={location.state} />
            <h3>Tutorial Hours</h3>
            <Counter sectionLabel={"TutorialHours"} outlineID={location.state} />
            <h3>Credits</h3>
            <Switch sectionLabel={"Credits"} outlineID={location.state} />
            <h1>Antirequisites</h1>
            <Textbox sectionLabel={"Antirequisites"} outlineID={location.state} />
            <h1>Prerequisites</h1>
            <Textbox sectionLabel={"Prerequisites"} outlineID={location.state} />
            <h1>Co-requisites</h1>
            <Textbox sectionLabel={"Corequisites"} outlineID={location.state} />
            <h1>CEAB Academic Units</h1>
            <h3>Engineering Science %</h3>
            <Textbox sectionLabel={"CEABEngineeringScience%"} outlineID={location.state} />
            <h3>Engineering Design %</h3>
            <Textbox sectionLabel={"CEABEngineeringDesign%"} outlineID={location.state} />
            <h1>Required Textbook</h1>
            <Textbox sectionLabel={"RequiredTextbook"} outlineID={location.state} />
            <h1>Other Required References</h1>
            <Textbox sectionLabel={"RequiredRefrences"} outlineID={location.state} />
            <h1>Recommended References</h1>
            <Textbox sectionLabel={"RecommendedRefrences"} outlineID={location.state} />
            <h1>General Learning Objectives (CEAB)</h1>
            <LearningObjective objective={"Use of Engineering Tools"} sectionLabel={"ToolsCEAB"} outlineID={location.state} />
            <LearningObjective objective={"Impact on Society and the Environment"} sectionLabel={"EnvironmentCEAB"} outlineID={location.state} />
            <LearningObjective objective={"Problem Analysis"} sectionLabel={"ProblemCEAB"} outlineID={location.state} />
            <LearningObjective objective={"Individual and Team Work"} sectionLabel={"WorkCEAB"} outlineID={location.state} />
            <LearningObjective objective={"Ethics and Equity"} sectionLabel={"EthicsCEAB"} outlineID={location.state} />
            <LearningObjective objective={"Investigation"} sectionLabel={"InvestigationCEAB"} outlineID={location.state} />
            <LearningObjective objective={"Communication Skills"} sectionLabel={"CommunicationCEAB"} outlineID={location.state} />
            <LearningObjective objective={"Economics and Project Management"} sectionLabel={"ManagementCEAB"} outlineID={location.state} />
            <LearningObjective objective={"Design"} sectionLabel={"DesignCEAB"} outlineID={location.state} />
            <LearningObjective objective={"Professionalism"} sectionLabel={"ProfessionalismCEAB"} outlineID={location.state} />
            <LearningObjective objective={"Life-Long Learning"} sectionLabel={"LearningCEAB"} outlineID={location.state} />
            <h1>Topics</h1>
            <TopicCreator sectionLabel={"Topics"} outlineID={location.state} />
            <h1>Evaluation</h1>
            <Evaluation sectionLabel={"Evaluation"} outlineID={location.state} />
            <h1>Late Submission Policy</h1>
            <Textbox sectionLabel={"LateSubmissionPolicy"} outlineID={location.state} />
            <h1>Assignment Submission Locker</h1>
            <Textbox sectionLabel={"SubmissionLocker"} outlineID={location.state} />
            <h1>Use of English</h1>
            <Textbox sectionLabel={"UseOfEnglish"} outlineID={location.state} />
            <h1>Attendance</h1>
            <Textbox sectionLabel={"Attendance"} outlineID={location.state} />
            <h1>Absence Due to Illnes or Other Circumstances</h1>
            <Textbox sectionLabel={"Absence"} outlineID={location.state} />
            <h1>Missed Midterm Examinations</h1>
            <Textbox sectionLabel={"MissedMidterm"} outlineID={location.state} />
            <h1>Cheating and Plagiarism</h1>
            <Textbox sectionLabel={"Cheating"} outlineID={location.state} />
            <h1>Use of Electronic Devices</h1>
            <Textbox sectionLabel={"ElectronicDevices"} outlineID={location.state} />
            <h1>Use of Personal Response Devices ("Clickers")</h1>
            <Textbox sectionLabel={"Clickers"} outlineID={location.state} />
            <h1>Policy on Repeating All Components of a Course</h1>
            <Textbox sectionLabel={"RepeatingCourse"} outlineID={location.state} />
            <h1>Internet and Electronic Mail</h1>
            <Textbox sectionLabel={"Internet&Email"} outlineID={location.state} />
            <h1>Accessibility</h1>
            <Textbox sectionLabel={"Accessibility"} outlineID={location.state} />
            <button>Submit</button>
        </div>
    )
}

export default CreateOutline;

