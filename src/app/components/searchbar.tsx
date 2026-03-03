"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchBar = () => {

    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    const onChangeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleSearch = () => {
        router.push(`/search?q=${search}`)
    }

    return(
        <div>
            <input
            onChange={onChangeSearch}
            value={search}
            onKeyDown={(e) => {
                if(e.key === 'Enter') {
                    handleSearch()
                }
            }}
            />
            <button onClick={handleSearch}>검색</button>
        </div>
    )
} 

export default SearchBar;