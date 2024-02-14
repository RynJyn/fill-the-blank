import React from "react";
import SubmitBtn from "./ui/SubmitBtn";

import "../styles/Home.scss";

function Home(props)
{
    return (<>
        <h2>Fill in the Blank</h2>
        <p>Welcome to my small React project!</p>
        <div id="game-info">
            <h3>Game Info</h3>
            <p>You will be shown a series of prompts consisting of famous quotes, lyrics, idioms etc. Each of these prompts will have a missing word which you will have to identify correctly from the provided options.</p>
            <p>To help you, each prompt will show its respective category. Additionally, you can reveal the source of the prompt however doing so will only award <span class="warning">half points</span> for that round.</p>
            <p>Each correct guess will award you with a maximum of 1000 points. Have fun and thanks for playing!</p>
        </div>
        <SubmitBtn text="Start" onClick={()=>{props.changeState()}}></SubmitBtn>
    </>);
}

export default Home;