import React from 'react'
import BookTable from './BookTable'
import { Button } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import useBookHandler from '../../../hooks/useBookHandler';
import { useDispatch } from 'react-redux';
import { showAddModal } from '../../../lib/features/global';
import AddEditModal from '../AddEditModal';

export default function DashboardContainer() {

    const { books, addBook, editBook, deleteBook } = useBookHandler();

    const dispatch = useDispatch();

    return (
        <div className='p-5 w-full'>
            <div className='flex my-4 h-10'>
                <Button onClick={() => {
                    dispatch(showAddModal());
                }}
                    variant='outlined'
                    color='primary'
                    sx={{ borderWidth: "2px", textTransform: "none" }}>
                    <AddRoundedIcon sx={{ fontSize: "14px" }} />
                    Add Book
                </Button>
            </div>
            <BookTable books={books} deleteBook={deleteBook} />
            <AddEditModal addBook={addBook} editBook={editBook} />
        </div>
    )
}
