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
    if(appState === STATE.PLAYING)
    {
        displayItem = <Game/>;
    }
    else 
    {
        displayItem = <Home changeState={()=>{setAppState(STATE.PLAYING)}}/>;
    }

    return (
        <>
            <main>
                {displayItem}
            </main>
        </>
    );
}

export default App;