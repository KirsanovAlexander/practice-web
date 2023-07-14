import React, { useState, useEffect } from 'react';
import { Header } from '../../components';
import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
// import Table from '@mui/material/Table';
// import Input from '@mui/material/Input';
// import Select from '@mui/material/Select';
import { DataGrid } from "@mui/x-data-grid";
import { Preorder, Configuration, Environment } from "../../models";
import DropDownList from "./DropDownList";
import { Link } from 'react-router-dom';

interface PreordersProps { }

const COLUMNS = [
   {
      headerName: "ID",
      field: "id",
      width: 70,
   },
   {
      headerName: "Рег.номер",
      field: "regNumber",
      width: 200,
      renderCell: (params) => <Link to={`/preorders/${params.row.id}`}>{params.value}</Link>,
   },
   {
      headerName: "Статус",
      field: "status",
      width: 200,
      renderCell: (params) => {

         const text = params.value

         if (text === "NEW") {
            return <div className="status new">{text}</div>;
         } else if (text === "APPROVED") {
            return <div className="status approved">{text}</div>;
         } else if (text === "IN_WORK") {
            return <div className="status inWork">{text}</div>;
         }
         if (text === "COMPLETED") {
            return <div className="status complited">{text}</div>;
         } else {
            return <div className="status canceled">{text}</div>;
         }
      },
   },
];

const STATUSES = [
   {
      value: "",
      label: "",
   },
   {
      value: "NEW",
      label: "NEW",
   },
   {
      value: "APPROVED",
      label: "APPROVED",
   },
   {
      value: "IN_WORK",
      label: "IN_WORK",
   },
   {
      value: "COMPLETED",
      label: "COMPLETED",
   },
   {
      value: "CANCELED",
      label: "CANCELED",
   },
];


export function Preorders() {
   const [count, setCount] = useState(0);
   const [data, setData] = useState([]);
   const [codesConfigurations, setCodesConfigurations] = useState();
   const [codesEnvironments, setCodesEnvironments] = useState();

   useEffect(() => {
      // Preorder.find(21).then(result => console.log(result)) ПОИСК

      // 	Preorder.search({ preorderTypeId: 1, perPage: 5, page: 1 }).then(results => {dataSource = results.results; console.log(dataSource)})
      // }, [])
      // Preorder.search().then((results) => {
      //   setData(results.results);
      //   setCount(results.count);
      // });

      async function searchData() {
         try {
            const results = await Preorder.search();

            setData(results.results);
            setCount(results.count);
         } catch (error) {
            console.error(error);
         }
      }
      searchData();

      Configuration.search().then((results) => {
          setCodesConfigurations(
            Array.prototype.map.call(results.results, (el) => ({
               ["value"]: el.id,
               ["label"]: el.code,
            }))
         );
      });
      Environment.search().then((results) => {
         setCodesEnvironments(
            Array.prototype.map.call(results.results, (el) => ({
               ["value"]: el.id,
               ["label"]: el.code,
            }))
         );
      });
   }, []);

   return <>
      <Header title="Потребности" actions={<><Button variant="contained" endIcon={<Add />}>
         Создать
      </Button></>}
      />

      <Box display="flex">
         <Box flexBasis="200px" mr="2">
            <FormControl fullWidth>
               <TextField
                  placeholder="Начните ввод номера"
                  label="Рег. номер:"
                  onChange={(text) => {
                     Preorder.search({ regNumber: text.target.value }).then(
                        (results) => {
                           setData(results.results);
                           setCount(results.count);
                        }
                     );
                  }}
               />
            </FormControl>
         </Box>

         <Box flexBasis="200px" mr="2">
            <FormControl fullWidth>
               <InputLabel id="configurations">Конфигурация:</InputLabel>

               <Select
                  labelId="configurations"
                  label="Конфигурация:"
                  onChange={(el) => {
                     Preorder.search({ configurationId: el }).then((results) => {
                        setData(results.results);
                        setCount(results.count);
                     });
                  }}
               >
                  {(codesConfigurations || []).map(({ value, label }) => (
                     <MenuItem
                        key={value}
                        value={value}
                     >
                        {label}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Box>

         <Box flexBasis="200px" mr="2">
            <FormControl fullWidth>
               <InputLabel id="environments">Среда:</InputLabel>

               <Select
                  labelId="environments"
                  label="Среда:"
                  onChange={(el) => {
                     Preorder.search({ environmentId: el }).then((results) => {
                        setData(results.results);
                        setCount(results.count);
                     });
                  }}
               >
                  {(codesEnvironments || []).map(({ value, label }) => (
                     <MenuItem
                        key={value}
                        value={value}
                     >
                        {label}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Box>


         <Box flexBasis="200px" mr="2">
            <FormControl fullWidth>
               <InputLabel id="statuses">Статусы:</InputLabel>

               <Select
                  labelId="statuses"
                  label="Статусы:"
                  onChange={(el) => {
                     Preorder.search({ status: el }).then((results) => {
                        setData(results.results);
                        setCount(results.count);
                     });
                  }}
               >
                  {(STATUSES || []).map(({ value, label }) => (
                     <MenuItem
                        key={value}
                        value={value}
                     >
                        {label}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Box>

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
   </>;
};
