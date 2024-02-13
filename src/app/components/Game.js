import React, {useState} from "react";
import {shuffle} from "../../utils";
import SubmitBtn from "./ui/SubmitBtn";

/*** 
 * 
 * TO DO
 * Move the list of questions and answer into its own file, then use fetch to handle retrieving them.
 * 
 ***/
const questions = [
    {
        prompt: "Fill in the _____",
        options:  ["Balloon", "Blank", "Pit", "Form"],
        answer: 1
    },
    {
        prompt: "___, I've got a feeling we're not in Kansas anymore.",
        options: ["Toto", "Tin Tin", "Uh Oh", "Yono"],
        answer: 0
    },
    {
        prompt: "The early bird gets the _____.",
        options: ["Morning dew", "Worm", "Virus", "AUX cord"],
        answer: 1
    }
];

let shuffledQuestions = shuffle([...questions]);

function Game()
{
    const [isCorrect, setIsCorrect] = useState(false);
    const [question, setQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState(null);

    function checkAnswer(value)
    {
        setUserAnswer(value);
        setIsCorrect(value === shuffledQuestions[question].answer);
    }

    function goToNext()
    {
        if((question + 1) < shuffledQuestions.length)
        {
            setIsCorrect(false);
            setUserAnswer(null);
            setQuestion(question + 1);
        }
    }

    function getClass(value)
    {
        if(value === userAnswer)
        {
            if(isCorrect)
            {
                return "correct";
            }
            else 
            {
                return "incorrect";
            }
        }
        else if (value === shuffledQuestions[question].answer && userAnswer !== null)
        {
            return "actual";
        }

        return "";
    }

    function reset()
    {
        setIsCorrect(false);
        setUserAnswer(null);
        setQuestion(0);
    }

    let buttonToShow;
    if(userAnswer !== null)
    {
        if((question + 1) === shuffledQuestions.length)
        {
            buttonToShow = <SubmitBtn text="Play again" onClick={reset}/>;
        }
        else 
        {
            buttonToShow = <SubmitBtn text="Next" onClick={goToNext}/>;
        }
    }

    return (<>
        <h2>Question: {(question + 1)}</h2>
        <input type="text" readOnly value={shuffledQuestions[question].prompt}/>
            {
                shuffledQuestions[question].options.map((o, i) => {
                    return <button onClick={()=>{checkAnswer(i)}} className={`option ${getClass(i)}`} type="button">{o}</button>
                })
            }
        {
            buttonToShow
        }
    </>);
}

export default Game;