import React, { useState, useEffect } from "react";
import { Header } from "../../components";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { Preorder, Configuration, Environment, Datacenter, PreorderType } from "../../models";
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


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
    renderCell: (params: { row: { id: any; }; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
      <Link to={`/preorders/${params.row.id}`}>{params.value}</Link>
    ),
  },
  {
    headerName: "configurationId",
    field: "configurationId",
    width: 200,
  },
  {
    headerName: "datacenterIds",
    field: "datacenterIds",
    width: 200,
  },
  {
    headerName: "preorderTypeId",
    field: "preorderTypeId",
    width: 200,
  },
  {
    headerName: "Статус",
    field: "status",
    width: 200,
    renderCell: (params) => {
      const text = params.value;

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
  }
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
  const [codesDatacenters, setCodesDatacenters] = useState();
  const [codesPreorderTypes, setCodesPreorderTypes] = useState();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
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
    Datacenter.search().then((results) => {
      setCodesDatacenters(
        Array.prototype.map.call(results.results, (el) => ({
          ["value"]: el.id,
          ["label"]: el.code,
        }))
      );
    });
    PreorderType.search().then((results) => {
      setCodesPreorderTypes(
        Array.prototype.map.call(results.results, (el) => ({
          ["value"]: el.id,
          ["label"]: el.code,
        }))
      );
    });
  }, []);

  return (
    <>
      <Header
        title="Потребности"
        actions={<>
          <Button
            variant="contained"
            endIcon={<Add />}
          >
            Создать
          </Button>
        </>} />
      <List
        sx={{ 
          width: '100%', 
          maxWidth: 1000, 
          bgcolor: 'background.paper' 
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Filter" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton 
              sx={{ pl: 4, 
              maxWidth: 700 
              }}>
              <Box display="flex">
                <Box
                  flexBasis="200px"
                  mr="2"
                >
                  <FormControl fullWidth>
                    <TextField
                      className="filter__select"
                      placeholder="Начните ввод номера"
                      label="Рег. номер:"
                      onChange={(text) => {
                        Preorder.search({ regNumber: text.target.value }).then(
                          (results) => {
                            setData(results.results);
                            setCount(results.count);
                          }
                        );
                      }} />
                  </FormControl>
                </Box>
                <Box
                  flexBasis="200px"
                  mr="2">
                  <FormControl fullWidth>
                    <InputLabel id="configurations">Конфигурация:</InputLabel>
                    <Select
                      className="filter__select"
                      labelId="configurations"
                      label="Конфигурация:"
                      onChange={(el) => {
                        Preorder.search({ configurationId: el.target.value }).then((results) => {
                          setData(results.results);
                          setCount(results.count);
                        });
                      }}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
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
                      className="filter__select"
                      labelId="environments"
                      label="Среда:"
                      onChange={(el) => {
                        Preorder.search({ environmentId: el.target.value }).then((results) => {
                          setData(results.results);
                          setCount(results.count);
                        });
                      }}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
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
                      className="filter__select"
                      labelId="statuses"
                      label="Статусы:"
                      onChange={(el) => {
                        Preorder.search({ status: el }).then((results) => {
                          setData(results.results);
                          setCount(results.count);
                        });
                      }}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
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
                <Box flexBasis="200px" mr="2">
                  <FormControl fullWidth>
                    <InputLabel id="environments">Дата-центры:</InputLabel>
                    <Select
                      className="filter__select"
                      labelId="environments"
                      label="Среда:"
                      onChange={(el) => {
                        Preorder.search({ datacenterIds: el.target.value }).then((results) => {
                          setData(results.results);
                          setCount(results.count);
                        });
                      }}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {(codesDatacenters || []).map(({ value, label }) => (
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
                    <InputLabel id="environments">Тип потребности:</InputLabel>
                    <Select
                      className="filter__select"
                      labelId="environments"
                      label="Среда:"
                      onChange={(el) => {
                        Preorder.search({ preorderTypeId: el.target.value }).then((results) => {
                          setData(results.results);
                          setCount(results.count);
                        });
                      }}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {(codesPreorderTypes || []).map(({ value, label }) => (
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
            </ListItemButton>
          </List>
        </Collapse>
      </List><>
        <div className="countData">Найдено: {count}</div>
        <DataGrid
          rows={data}
          columns={COLUMNS}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          checkboxSelection
          disableColumnFilter />
      </></>
  );
}
