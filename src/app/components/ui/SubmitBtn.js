import React from "react";

function SubmitBtn(props)
{
    return <button onClick={props.onClick ? props.onClick : ()=>{console.log("Ouch!");}}type="button">{props.text ? props.text : "Submit"}</button>;
}

export default SubmitBtn;