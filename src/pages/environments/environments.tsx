import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import {Environment, Preorder} from '../../models'
import {JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState} from 'react'
import {DataGrid} from '@mui/x-data-grid'
import {Link} from 'react-router-dom'


const COLUMNS = [
  {
    headerName:"ID",
    field:"id",
    width:100,
  },
  {
    headerName:"Title",
    field:"title",
    width:200,
  },
  {
    headerName: "Code",
    field: "code",
    width: 200,
    renderCell: (params: { row: { id: any }; value: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }) => (
      <Link to={`/environments/${params.row.id}`}>{params.value}</Link>
    ),
  },
  {
    headerName: "Description",
    field: "description",
    width: 600,
  },
];

export function Environments() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function searchData() {
      try {
        const results = await Environment.search();

        setData(results.results);
        setCount(results.count);
      } catch (error) {
        console.error(error);
      }
    }
    searchData();
  }, []);

  return (
    <>
      <Typography variant="h5" noWrap component="div">
        Среды
      </Typography>
      <Box 
      flexBasis="200px" 
      mr="50"
      >
        <FormControl fullWidth>
          <TextField
            placeholder="Начните ввод номера"
            label="Название"
            onChange={function (text) {
              Environment.search({ term: text.target.value }).then(
                (results) => {
                  setData(results.results)
                  setCount(results.count)
                }
              )
            }}
          />
        </FormControl>
      </Box>
      <div className="countData">Найдено: {count}</div>
      <DataGrid
        rows={data}
        columns={COLUMNS}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableColumnFilter
      />
    </>
  );
}
