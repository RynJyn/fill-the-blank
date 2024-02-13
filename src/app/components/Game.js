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
        cat: "Games",
        options:  ["Balloon", "Blank", "Pit", "Form"],
        answer: 1,
        source: "This"
    },
    {
        prompt: "___, I've got a feeling we're not in Kansas anymore.",
        cat: "Movies",
        options: ["Toto", "Tin Tin", "Uh Oh", "Yono"],
        answer: 0,
        source: "The Wizard of Oz (1939)"
    },
    {
        prompt: "The early bird gets the _____.",
        cat: "Idioms",
        options: ["Morning dew", "Worm", "Virus", "AUX cord"],
        answer: 1,
        source: "William Camden’s Book of Proverbs"
    }
];

let shuffledQuestions = shuffle([...questions]);

function Game()
{
    const [isCorrect, setIsCorrect] = useState(false);
    const [question, setQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState(null);
    const [hintRevealed, setHintRevealed] = useState(false);

    function checkAnswer(value)
    {
        setUserAnswer(value);
        setIsCorrect(value === shuffledQuestions[question].answer);
    }

    function goToNext()
    {
        if((question + 1) < shuffledQuestions.length)
        {
            setHintRevealed(false);
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
        setHintRevealed(false);
        setIsCorrect(false);
        setUserAnswer(null);
        setQuestion(0);
    }

    function getSourceElement()
    {
        if(!hintRevealed)
        {
            return <button type="button" onClick={()=>{setHintRevealed(true);}}>Click to Reveal</button>
        }
        else 
        {
            return <span>{shuffledQuestions[question].source}</span>
        }
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
        <p>Category: {shuffledQuestions[question].cat}</p>
        <p>Source: {getSourceElement()}</p>
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