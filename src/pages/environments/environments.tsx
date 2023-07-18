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
  const [count1, setCount1] = useState(0);
  const [data1, setData1] = useState([]);
  const [codesConfigurations, setCodesConfigurations] = useState();
  const [codesEnvironments, setCodesEnvironments] = useState();

  useEffect(() => {
    async function searchData1() {
      try {
        const results = await Environment.search();

        setData1(results.results);
        setCount1(results.count);
      } catch (error) {
        console.error(error);
      }
    }
    searchData1();
    // Environment.search().then((results) => {
    //   setCodesEnvironments(
    //     Array.prototype.map.call(results.results, (el) => ({
    //       ["value"]: el.id,
    //       ["label"]: el.code,
    //     }))
    //   );
    // });
  }, []);

  return (
    <>
      <Typography variant="h5" noWrap component="div">
        Среды
      </Typography>
      <Box flexBasis="200px" mr="50">
        <FormControl fullWidth>
          <TextField
            placeholder="Начните ввод номера"
            label="Название"
            onChange={function (text) {
              Environment.search({ code: text.target.value }).then(
                (results) => {
                  setData1(results.results)
                  setCount1(results.count)

                }
              )
            }}
          />
        </FormControl>
      </Box>
      <Box flexBasis="200px" mr="2">
          <FormControl fullWidth>
            <InputLabel id="environments">Среда:</InputLabel>
            <Select
              labelId="environments"
              label="Среда:"
              onChange={(el) => {
                Environment.search({ id: el.target.value }).then((results) => {
                  setData1(results.results);
                  setCount1(results.count);
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
      <div className="countData">Найдено: {count1}</div>
      <DataGrid
        rows={data1}
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
