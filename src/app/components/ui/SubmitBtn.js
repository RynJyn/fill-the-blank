import React from "react";

import "../../styles/ui/SubmitBtn.scss";

function SubmitBtn(props)
{
    return <button className="submit-btn" onClick={props.onClick ? props.onClick : ()=>{console.log("Ouch!");}}type="button">{props.text ? props.text : "Submit"}</button>;
}

export default SubmitBtn;