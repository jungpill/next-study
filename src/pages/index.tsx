import { InferGetServerSidePropsType } from "next";
import { fetchBooks, fetchRandomBooks } from "../../lib/fetch-bookt"


// server-side-rendering방식 
// export const getServerSideProps = async() => {
//   // const allBooks = await fetchBooks();
//   // const recordBookx = await fetchRandomBooks();

//   const [allBooks, recordBooks] = await Promise.all([fetchBooks(),fetchRandomBooks()])

//   return{
//     props: {
//       allBooks,
//       recordBooks
//     }
//   }
// }

export const getStaticProps = async() => {
  // const allBooks = await fetchBooks();
  // const recordBookx = await fetchRandomBooks();

  const [allBooks, recordBooks] = await Promise.all([fetchBooks(),fetchRandomBooks()])

  return{
    props: {
      allBooks,
      recordBooks
    },
  }
}

export default function Home({
  allBooks,
  recordBooks
  }: InferGetServerSidePropsType<typeof getStaticProps>) {


  const handleClick = async() => {
    const res = await fetchBooks()
    console.log(res)
  }

  return (
     <h1 onClick={handleClick}>
      인덱스
      {allBooks.map((k,idx) => {
        return(
          <div key={k.id}>
            {idx}
          </div>
        )
      })}
     </h1>
  )
}
