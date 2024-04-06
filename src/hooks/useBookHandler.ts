import React, { useEffect, useState } from 'react'
import { IBook } from '../types'
import Axios from '../config/axios';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { closeAddEditModal } from '../lib/features/global';


export default function useBookHandler() {

    const [books, setBooks] = useState<IBook[]>([])
    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();

    useEffect(() => {
        getBooks();
    }, [])

    const getBooks = () => {
        Axios.get("/books").then(res => {
            setBooks(res.data);
        })
            .catch(err => {
                enqueueSnackbar(err, {
                    variant: "error"
                })
            })
    }

    const addBook = (book: Omit<IBook, "id">) => {
        Axios.post("/books", book).then(res => {
            getBooks();
        })
            .catch(err => {
                enqueueSnackbar(err, {
                    variant: "error"
                })
            })
            .finally(() => {
                dispatch(closeAddEditModal())
            })
    }

    const editBook = (book: IBook) => {
        Axios.put("/books/" + book.id, book).then(res => {
            enqueueSnackbar("Book Edited Successfully", {
                variant: "success"
            })
            getBooks();
        })
            .catch(err => {
                enqueueSnackbar(err, {
                    variant: "error"
                })
            })
            .finally(() => {
                dispatch(closeAddEditModal())
            })
    }

    const deleteBook = (id: string) => {
        Axios.delete("/books/" + id).then(res => {
            enqueueSnackbar("Book Deleted Successfully", {
                variant: "success"
            })
            getBooks();
        })
            .catch(err => {
                enqueueSnackbar(err, {
                    variant: "error"
                })
            })
    }

    return {
        books,
        addBook,
        getBooks,
        editBook,
        deleteBook
    }
}
