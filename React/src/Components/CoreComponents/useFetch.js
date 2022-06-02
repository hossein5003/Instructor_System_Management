import React, {useEffect, useState} from 'react';
import axios from "axios";

const GET = axios.create({
    baseURL: "https://localhost:7220/api/"
})

export const useFetch = (url) => {
    const [state, setState] = useState({});

    useEffect(() => {
        GET.get(url).then(
            response => setState(response.data))
    }, [url]);

    return {state};
}

export const FetchPost = (url,newRecord) => {
    const [state, setState] = useState({});

    useEffect(() => {
        GET.post(url,newRecord).then(
            response => setState(response.data))
    }, [url]);

    return {state};
}