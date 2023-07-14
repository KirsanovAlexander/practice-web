import { Box, FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Environment } from "../../models";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";


// function createData(
//     id: number,
//     title: string,
//     code: string,
//   ) {
//     return { id, title, code };
//   }

//   const rows =[
//     {
//       "id": 1,
//       "code": "PROD",
//       "title": "Пром",
//       "description": "Промышленная среда"
//     },
//     {
//       "id": 2,
//       "code": "TEST",
//       "title": "Тест",
//       "description": "Тестовая среда"
//     },
//     {
//       "id": 3,
//       "code": "NT",
//       "title": "НТ",
//       "description": "Среда для нагрузочного тестирования"
//     },
//     {
//       "id": 4,
//       "code": "DEV",
//       "title": "Дев",
//       "description": "Среда разработки"
//     }
//   ]

const COLUMNS = [
    {
       headerName: "ID",
       field: "id",
       width: 100,
    },
    {
       headerName: "Title",
       field: "title",
       width: 200,
    //    renderCell: (params) => <Link to={`/preorders/${params.row.id}`}>{params.value}</Link>,
    },
    {
        headerName: "Code",
        field: "code",
        width: 200,
        renderCell: (params) => <Link to={`/environments/${params.row.id}`}>{params.value}</Link>,
     },
     {
      headerName: "Description",
      field: "description",
      width: 600,
   }
]
  

export function Environments(){
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


return<>
    <Typography variant="h5" noWrap component="div">
      Среды
    </Typography>
    {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Code</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.code}</TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}


    <Box flexBasis="200px" mr="50">
            <FormControl fullWidth>
               <TextField
                  placeholder="Начните ввод номера"
                  label="Название"
                  onChange={(text:any) => {
                    Environment.search({ title: text.target.value }).then(
                        (results) => {
                           setData(results.results);
                           setCount(results.count);
                        }
                     );
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
}