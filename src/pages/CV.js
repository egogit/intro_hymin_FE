import Header from "../components/Header";
import CVContent from "../components/CVContent";

function CV(){
    return(
        <div>
            <Header />
            <CVContent title="Education"/>
            <CVContent title="Work Experience"/>
            <CVContent title="Certificate"/>
            <CVContent title="Skills"/>
            <CVContent title="Awards"/>
            <CVContent title="Interests"/>
            <CVContent title="Repository"/>
        </div>
    )
}

export default CV;