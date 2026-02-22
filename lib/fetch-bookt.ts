import { instance } from "./api";

interface BookData {
    id: number;
    title: string;
    subTitle: string;
    author: string
    publisher: string;
    description: string;
    coverImgUrl: string;
}

export const fetchBooks = async(q?:string):Promise<BookData[]> => {
    const url = q ? "/books/search" : "/books";

    try{
        const res = await instance.get(url,{
            params: q ? {q} : undefined
        })

        return res.data;
    }catch(err){
        console.error(err);
        return []
    }
}

export const fetchRandomBooks = async():Promise<BookData[]> => {
    try{
        const res = await instance.get('book/random')
        return res.data;
    }catch(err){
        console.error(err);
        return []
    }
}

export const fetchDetailBook = async(id:number):Promise<BookData | null> => {
    try{
        const res = await instance.get(`book/${id}`)
        return res.data
    }catch(err){
        console.error(err)
        return null
    }
}