import {
  Box,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Datacenter } from "../../models";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";


const COLUMNS = [
  {
    headerName: "ID",
    field: "id",
    width: 100,
  },
  {
    headerName: "Title",
    field: "title",
    width: 300,
  },
  {
    headerName: "Code",
    field: "code",
    width: 600,
    renderCell: (params) => (
      <Link to={`/data-centers/${params.row.id}`}>{params.value}</Link>
    ),
  },
];

export function Datacenters() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);


  useEffect(() => {
    async function searchData() {
      try {
        const results: any = await Datacenter.search();

        setData(results.results);
        setCount(results.count);
      } catch (error) {
        console.error(error);
      }
    }
    searchData();
  }, []);

  console.log(data)

  return (
    <>
      <Typography variant="h5" noWrap component="div">
        Дата-центры
      </Typography>
      <Box
        flexBasis="200px"
        mr="2"
      >
        <FormControl fullWidth>
          <TextField
            placeholder="Начните ввод номера"
            label="Название"
            onChange={(text: any) => {
              Datacenter.search({ code: text.target.value }).then((results) => {
                setData(results.results);
                setCount(results.count);
              });
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
