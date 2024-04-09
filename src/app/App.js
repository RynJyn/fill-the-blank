import React, { useState } from "react";
import "./App.scss";

import Home from "./components/Home";
import Game from "./components/Game";

const STATE = {
    HOME: "home",
    PLAYING: "playing"
};

function App()
{
    const [appState, setAppState] = useState(STATE.HOME);

    let displayItem;
    let mainID;

    if(appState === STATE.PLAYING)
    {
        displayItem = <Game/>;
        mainID = "game";
    }
    else 
    {
        displayItem = <Home changeState={()=>{setAppState(STATE.PLAYING)}}/>;
        mainID = "home";
    }

    return (
        <>
            <main id={mainID}>
                {displayItem}
            </main>
        </>
    );
}

export default App;