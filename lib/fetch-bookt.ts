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

export const fetchBooks = async():Promise<BookData[]> => {
    try{
        const res = await instance.get('book')

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