import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { fetchDetailBook } from "../../../lib/fetch-bookt"

export const getStaticPaths = () => {
    return {
        paths: [
            {params: {id: "1"}},
            {params: {id: "2"}},
            {params: {id: "3"}},
        ],
        fallback: "blocking", 
    }
}

export const getStaticProps = async(
    context
    : GetServerSidePropsContext) => {
    const id = context.params!.id
    const book = await fetchDetailBook(Number(id))

    return{
        props: {
            book
        }
    }
}

export default function Page({
    book,
}: InferGetServerSidePropsType<typeof getStaticProps>){
    return(
        <div>
            Hello Detail Book Page<br/>
            book id is {book?.id}
        </div>
    )
}