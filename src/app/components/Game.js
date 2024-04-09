import React, {useState} from "react";
import {shuffle} from "../../utils";
import SubmitBtn from "./ui/SubmitBtn";

import "../styles/Game.scss";

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
    },
    {
        prompt: "Bowties are _____",
        cat: "TV",
        options: ["Hard to tie", "Small", "Cool", "Retro"],
        answer: 2,
        source: "Doctor Who (2005-Present)"
    },
    {
        prompt: "Live long and _____",
        cat: "TV",
        options: ["Beyond", "Tell the world your story", "Good fortune", "Prosper"],
        answer: 3,
        source: "Star Trek (1966-1969)"
    }
];

let shuffledQuestions = shuffle([...questions]);

function Game()
{
    const [isCorrect, setIsCorrect] = useState(false);
    const [question, setQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState(null);
    const [hintRevealed, setHintRevealed] = useState(false);
    const [score, setScore] = useState(0);

    function checkAnswer(value)
    {
        //Only check if the user hasn't already answered for this round. Cover the case in which the player may remove the "disabled" attribute from an option
        if(userAnswer === null)
        {
            const award = 1000;
            const multiplier = hintRevealed ? 0.5 : 1;
            let isCorrect = value === shuffledQuestions[question].answer;

            if(isCorrect)
            {
                setScore(score + (award * multiplier));
            }

            setUserAnswer(value);
            setIsCorrect(isCorrect);
        }
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
        setScore(0);
    }

    function getSourceElement()
    {
        if(!hintRevealed)
        {
            return <button type="button" id="reveal-btn" onClick={()=>{setHintRevealed(true);}}>Click to Reveal</button>
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
        <h3>{shuffledQuestions[question].prompt}</h3>
        <div className="options">
            {
                shuffledQuestions[question].options.map((o, i) => {
                    return <button onClick={()=>{checkAnswer(i)}} className={`option ${getClass(i)}`} type="button" disabled={userAnswer !== null ? true : false}>{o}</button>
                })
            }
        </div>
        {
            buttonToShow
        }
        <p>Score: <span>{score}</span></p>
    </>);
}

export default Game;