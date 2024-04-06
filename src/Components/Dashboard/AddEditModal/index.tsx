import { Button, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../lib/store'
import { IBook } from '../../../types'
import { closeAddEditModal } from '../../../lib/features/global'
import { enqueueSnackbar } from 'notistack'

interface IProps {
    addBook: (book: Omit<IBook, "id">) => void
    editBook: (book: IBook) => void
}

export default function AddEditModal({ addBook, editBook }: IProps) {

    const open = useSelector((state: RootState) => state.GlobalSlice.addEditModalShow)
    const mode = useSelector((state: RootState) => state.GlobalSlice.addEditModalType)
    const editingBook = useSelector((state: RootState) => state.GlobalSlice.editingBook)

    const [title, setTitle] = useState<string>("")
    const [author, setAuthor] = useState<string>("")
    const [quantity, setQuantity] = useState<string>("")

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeAddEditModal());
    }

    useEffect(() => {
        if (editingBook) {
            setTitle(editingBook.title)
            setAuthor(editingBook.author)
            setQuantity(editingBook.quantity.toString())
        }
        else {
            setTitle("")
            setAuthor("")
            setQuantity("")
        }
    }, [editingBook])

    const submit = () => {
        if (title && author && quantity) {
            if (mode == "add") {
                addBook({
                    title,
                    author,
                    quantity: parseInt(quantity)
                })
            }
            else {
                if (editingBook?.id)
                    editBook({
                        id: editingBook?.id,
                        title,
                        author,
                        quantity: parseInt(quantity)
                    })
            }
        }
        else {
            enqueueSnackbar("Fields shouldn't be empty", {
                variant: "error"
            })
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className='w-[375px] p-5 bg-white absolute top-1/3 rounded-lg left-1/2 -translate-x-1/2'>
                    <h1 className='text-xl font-semibold'>
                        {
                            mode == "add" ?
                                "Add"
                                :
                                "Edit"
                        }  Book
                    </h1>
                    <form onSubmit={(e) => { e.preventDefault(); submit()}}>
                        <TextField size="small" value={title} onChange={(e) => setTitle(e.currentTarget.value)} fullWidth label="Title" sx={{ my: '10px' }} />
                        <TextField size="small" value={author} onChange={(e) => setAuthor(e.currentTarget.value)} fullWidth label="Author" sx={{ my: '10px' }} />
                        <TextField size="small" type="number" value={quantity} onChange={(e) => setQuantity(e.currentTarget.value)} fullWidth label="Quantity" sx={{ my: '10px' }} />
                        <div className='flex gap-4 justify-between items-center'>
                            <Button onClick={() => handleClose()} variant='outlined' fullWidth sx={{ textTransform: "none" }} color='primary'>
                                Cancel
                            </Button>
                            <Button type="submit" variant='contained' fullWidth sx={{ textTransform: "none" }} color='secondary'>
                                {
                                    mode == "add" ?
                                        "Add"
                                        :
                                        "Edit"
                                }
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
