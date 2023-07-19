import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Configuration } from "../../models";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";


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
    renderCell: (params) => (
      <Link to={`/configurations/${params.row.id}`}>{params.value}</Link>
    ),
  },
  {
    headerName: "Description",
    field: "description",
    width: 750,
  },
];

export function Configurations() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [codesConfigurations, setCodesConfigurations] = useState();

  useEffect(() => {
    async function searchData() {
      try {
        const results: any = await Configuration.search();

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
        Конфигурации
      </Typography>
      <Box
        flexBasis="200px"
        mr="50"
      >
        <FormControl fullWidth>
          <TextField
            placeholder="Начните ввод номера"
            label="Название"
            onChange={(text: any) => {
              Configuration.search({ term: text.target.value }).then(
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
  );
}
