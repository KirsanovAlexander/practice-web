import { Box, FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Datacenter } from "../../models";
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
//       "code": "DC1",
//       "title": "MЦОД",
//       "description": "MЦОД"
//     },
//     {
//       "id": 2,
//       "code": "DC2",
//       "title": "MЦОД2",
//       "description": "MЦОД2"
//     },
//     {
//       "id": 3,
//       "code": "DC3",
//       "title": "MЦОД3",
//       "description": "MЦОД3"
//     },
//     {
//       "id": 4,
//       "code": "DC4",
//       "title": "MЦОД4",
//       "description": "MЦОД4"
//     },
//     {
//       "id": 5,
//       "code": "SK",
//       "title": "Сколково",
//       "description": "Сколково"
//     },
//     {
//       "id": 6,
//       "code": "SH",
//       "title": "ШП",
//       "description": "ШП"
//     },
//     {
//       "id": 7,
//       "code": "DC5",
//       "title": "АЦОД",
//       "description": "АЦОД"
//     },
//     {
//       "id": 8,
//       "code": "DC6",
//       "title": "АЦОД2",
//       "description": "АЦОД2"
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
       width: 300 ,
    },{
        headerName: "Code",
        field: "code",
        width: 600,
        renderCell: (params) => <Link to={`/data-centers/${params.row.id}`}>{params.value}</Link>,
     }
]
  
  
  
export function Datacenters(){
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function searchData() {
           try {
              const results:any = await Datacenter.search();
  
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
        Дата-центры
    </Typography>
    {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Code&nbsp;(g)</TableCell>
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
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}


    <Box flexBasis="200px" mr="2">
            <FormControl fullWidth>
               <TextField
                  placeholder="Начните ввод номера"
                  label="Название"
                  onChange={(text:any) => {
                    Datacenter.search({ code: text.target.value }).then(
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