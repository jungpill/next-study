"use client";

import React from "react";
import ServerComponent from "./server-component";

const ClientComponent = ({children}: {
    children: React.ReactNode
}) => {

    console.log('클라이언트 컴포넌트')
    return (
        <div>
            <ServerComponent/>
            <h1>Client Component</h1>
        </div>
    );
}

export default ClientComponent;