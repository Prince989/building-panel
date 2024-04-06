import { IconButton } from '@mui/material'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IBook } from '../../../../types';
import { useDispatch } from 'react-redux';
import { showEditModal } from '../../../../lib/features/global';

interface IBookTableProps {
  books: IBook[]
  deleteBook : (id : string) => void
}

const TableRow = ({ book, deleteBook } : { book: IBook, deleteBook : (id : string) => void }) => {

  const dispatch = useDispatch();

  return (
    <tr>
      <td>
        {book.id}
      </td>
      <td>
        {book.title}
      </td>
      <td>
        {book.author}
      </td>
      <td>
        {book.quantity}
      </td>
      <td>
        <IconButton onClick={() => {dispatch(showEditModal(book))}}>
          <CreateOutlinedIcon color='secondary' />
        </IconButton>
        <IconButton onClick={() => deleteBook(book.id)}>
          <DeleteOutlineOutlinedIcon color='primary' />
        </IconButton>
      </td>
    </tr>
  )
}

export default function BookTable({ books, deleteBook }: IBookTableProps) {

  return (
    <div className='w-full overflow-auto'>
      <table className='border'>
        <tr>
          <th>
            ID
          </th>
          <th>
            Title
          </th>
          <th>
            Author
          </th>
          <th>
            Quantity
          </th>
          <th>
            Actions
          </th>
        </tr>
        {
          books.map(book => (
            <TableRow book={book} deleteBook={deleteBook} />
          ))
        }
      </table>
    </div>
  )
}
