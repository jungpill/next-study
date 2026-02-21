import { InferGetServerSidePropsType } from "next";
import { fetchBooks, fetchRandomBooks } from "../../lib/fetch-bookt"

export const getServerSideProps = async() => {
  // const allBooks = await fetchBooks();
  // const recordBookx = await fetchRandomBooks();

  const [allBooks, recordBooks] = await Promise.all([fetchBooks(),fetchRandomBooks()])

  return{
    props: {
      allBooks,
      recordBooks
    }
  }
}

export default function Home({
  allBooks,
  recordBooks
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  console.log(allBooks)
  console.log(recordBooks)


  const handleClick = async() => {
    const res = await fetchBooks()
    console.log(res)
  }

  return (
     <h1 onClick={handleClick}>
      인덱스
     </h1>
  )
}
