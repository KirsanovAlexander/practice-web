import { Box, FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Configuration } from "../../models";
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
//       "code": "X86_R_2S_BIGDATA",
//       "title": "Rack2cpu BigData (32/512/72000)",
//       "description": "2х-сокетный сервер, монтируемый в стойку, тип BigData (32 CORE 512GB RAM 72TB RAW HDD)"
//     },
//     {
//       "id": 2,
//       "code": "X86_R_2S_GP_STANDART",
//       "title": "Rack2cpu GreenPlum Standart (36/768/46000)",
//       "description": "2х-сокетный сервер, монтируемый в стойку, тип GP Standart (36 CORE 768GB RAM 46TB NVMe+SSD)"
//     },
//     {
//       "id": 3,
//       "code": "X86_R_2S_KAFKA_L",
//       "title": "Rack2cpu Kafka L (16/128/7400)",
//       "description": "2х-сокетный сервер, монтируемый в стойку, тип Kafka L (16 CORE 128GB RAM 7400GB RAW HDD+SSD)"
//     }
//   ]

const COLUMNS = [
    {
       headerName: "ID",
       field: "id",
       width: 70,
    },
    {
       headerName: "Title",
       field: "title",
       width: 300,
    },
    {
        headerName: "Code",
        field: "code",
        width: 250,
        renderCell: (params) => <Link to={`/configurations/${params.row.id}`}>{params.value}</Link>,
     },
     {
        headerName: "Description",
        field: "description",
        width: 750,
     }
]
  
  
  
export function Configurations(){
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function searchData() {
           try {
              const results:any = await Configuration.search();
  
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
        Конфигурации
    </Typography>
    {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Code</TableCell>
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
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.code}</TableCell>
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
                    Configuration.search({ title: text.target.value }).then(
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