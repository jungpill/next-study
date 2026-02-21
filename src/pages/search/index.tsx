import { useRouter } from "next/router"

const search = () => {

    const router = useRouter();
    console.log(router)
    return(
        <h1>
            Search
        </h1>
    )
}

export default search