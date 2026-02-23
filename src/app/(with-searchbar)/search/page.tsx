const Page = async ({searchParams}: {searchParams: Promise<{q: string}>}) => {

    const {q} = await searchParams
    
    return(
        <div>
            search페이지
        </div>
    )

}

export default Page

    
