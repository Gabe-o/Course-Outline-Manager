import { React } from "react";
import Textbox from "../../components/create&editOutlineComponents/textbox";
import Counter from "../../components/create&editOutlineComponents/counter";
import Switch from "../../components/create&editOutlineComponents/creditsSwitch";
import LearningObjectivesDropdown from "../../components/create&editOutlineComponents/learningObjectivesDropdown";
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
            <Textbox sectionLabel={"InstructorName"} />
            <h3>Phone Number</h3>
            <Textbox sectionLabel={"InstructorPhoneNumber"} />
            <h3>Extension</h3>
            <Textbox sectionLabel={"InstructorPhoneExtension"} />
            <h3>UWO Email</h3>
            <Textbox sectionLabel={"InstructorEmail"} />
            <h3>Consulation Hours</h3>
            <Textbox sectionLabel={"InstructorConsultationHours"} />
            <h1>Acedemic Calender Copy</h1>
            <h1>Contact Hours</h1>
            <h3>Lecture Hours</h3>
            <Counter sectionLabel={"LectureHours"} />
            <h3>Labratory Hours</h3>
            <Counter sectionLabel={"LabHours"} />
            <h3>Tutorial Hours</h3>
            <Counter sectionLabel={"TutorialHours"} />
            <h3>Credits</h3>
            <Switch sectionLabel={"Credits"} />
            <h1>Antirequisites</h1>
            <Textbox sectionLabel={"Antirequisites"} />
            <h1>Prerequisites</h1>
            <Textbox sectionLabel={"Prerequisites"} />
            <h1>Co-requisites</h1>
            <Textbox sectionLabel={"Corequisites"} />
            <h1>CEAB Academic Units</h1>
            <h3>Engineering Science %</h3>
            <Textbox sectionLabel={"CEABEngineeringScience%"} />
            <h3>Engineering Design %</h3>
            <Textbox sectionLabel={"CEABEngineeringDesign%"} />
            <h1>Required Textbook</h1>
            <Textbox sectionLabel={"RequiredTextbook"} />
            <h1>Other Required References</h1>
            <Textbox sectionLabel={"RequiredRefrences"} />
            <h1>Recommended References</h1>
            <Textbox sectionLabel={"RecommendedRefrences"} />
            <h1>General Learning Objectives (CEAB)</h1>
            <LearningObjective objective={"Use of Engineering Tools"} sectionLabel={"ToolsCEAB"} />
            <LearningObjective objective={"Impact on Society and the Environment"} sectionLabel={"EnvironmentCEAB"} />
            <LearningObjective objective={"Problem Analysis"} sectionLabel={"ProblemCEAB"} />
            <LearningObjective objective={"Individual and Team Work"} sectionLabel={"WorkCEAB"} />
            <LearningObjective objective={"Ethics and Equity"} sectionLabel={"EthicsCEAB"} />
            <LearningObjective objective={"Investigation"} sectionLabel={"InvestigationCEAB"} />
            <LearningObjective objective={"Communication Skills"} sectionLabel={"CommunicationCEAB"} />
            <LearningObjective objective={"Economics and Project Management"} sectionLabel={"ManagementCEAB"} />
            <LearningObjective objective={"Design"} sectionLabel={"DesignCEAB"} />
            <LearningObjective objective={"Professionalism"} sectionLabel={"ProfessionalismCEAB"} />
            <LearningObjective objective={"Life-Long Learning"} sectionLabel={"LearningCEAB"} />
            <h1>Topics</h1>
            <TopicCreator sectionLabel={"Topics"} />
            <h1>Evaluation</h1>
            <Evaluation sectionLabel={"Evaluation"} />
            <h3>Evaluation Description</h3>
            <Textbox />
            <h1>Late Submission Policy</h1>
            <Textbox sectionLabel={"LateSubmissionPolicy"} />
            <h1>Assignment Submission Locker</h1>
            <Textbox sectionLabel={"SubmissionLocker"} />
            <h1>Use of English</h1>
            <Textbox sectionLabel={"UseOfEnglish"} />
            <h1>Attendance</h1>
            <Textbox sectionLabel={"Attendance"} />
            <h1>Absence Due to Illnes or Other Circumstances</h1>
            <Textbox sectionLabel={"Absence"} />
            <h1>Missed Midterm Examinations</h1>
            <Textbox sectionLabel={"MissedMidterm"} />
            <h1>Cheating and Plagiarism</h1>
            <Textbox sectionLabel={"Cheating"} />
            <h1>Use of Electronic Devices</h1>
            <Textbox sectionLabel={"ElectronicDevices"} />
            <h1>Use of Personal Response Devices ("Clickers")</h1>
            <Textbox sectionLabel={"Clickers"} />
            <h1>Policy on Repeating All Components of a Course</h1>
            <Textbox sectionLabel={"RepeatingCourse"} />
            <h1>Internet and Electronic Mail</h1>
            <Textbox sectionLabel={"Internet&Email"} />
            <h1>Accessibility</h1>
            <Textbox sectionLabel={"Accessibility"} />
            <button>Submit</button>
        </div>
    )
}

export default CreateOutline;

