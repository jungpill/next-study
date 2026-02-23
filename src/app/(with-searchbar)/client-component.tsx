"use client";
import ServerComponent from "./server-component";
const ClientComponent = () => {

    console.log('클라이언트 컴포넌트')
    return (
        <div>
            <ServerComponent/>
            <h1>Client Component</h1>
        </div>
    );
}

export default ClientComponent;