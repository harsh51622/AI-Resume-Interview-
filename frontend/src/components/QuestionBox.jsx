import { useState, useEffect } from "react";
import axios from "../api/axios"
import Interview from "../pages/interview";

export default function QuestionBox() {
    const [questions, setQuestions] = useState([]);

    const sessionId = localStorage.getItem("session_id")
    


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("/interview/questions/")
                setQuestions(response.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchdata()
    }, [])


    return (
        <>

            <div>


                {
                    questions.length > 0 ? (<Interview questions={questions} sessionId={sessionId} />) : (<p>No questions available.</p>)
                }

            </div>
        </>
                )
}