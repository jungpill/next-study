import ClientComponent from "@/app/components/client-component"

const Page = async ({searchParams}: {searchParams: Promise<{q: string}>}) => {

    const {q} = await searchParams
    
    return(
        <div>
            search페이지
            <ClientComponent>
                <></>
            </ClientComponent>
        </div>
    )

}

export default Page

    
