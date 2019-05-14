import React from "react";

const CLIENT_ID = "55a61a30945dd21cec9f2001";

export const UIMNavigation = () =>
    <div style={{minHeight: "55px", backgroundColor: "#142546", display: "flex", flexDirection: "row-reverse"}}>
        <div style={{marginRight: "6vh", marginTop: "2vh"}}>
            <div id="uim-navigation"
                 className="rb-uim uim-navigation"
                 data-uim-client-id={CLIENT_ID}
                 data-uim-profile-redirect="###redirecturl###"
                 data-uim-country="AT"
                 data-uim-language="de">
            </div>
        </div>
    </div>


