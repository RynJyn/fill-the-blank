import React from "react";
import SubmitBtn from "./ui/SubmitBtn";

function Home(props)
{
    return (<>
        <h2>Hello and welcome to the game!</h2>
        <SubmitBtn text="Start" onClick={()=>{props.changeState()}}></SubmitBtn>
    </>);
}

export default Home;