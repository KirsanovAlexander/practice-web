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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Preorder,
  Configuration,
  Environment,
  Datacenter,
  PreorderType,
} from "../../models";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Server } from "../../typings";
import { Datacenters } from './../datacenters/datacenters';

interface SelectItem {
  value: number;
  label: string;
}

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
  const [data, setData] = useState<Server.Preorder[]>([]);
  const [codesConfigurations, setCodesConfigurations] = useState<SelectItem[]>(
    []
  );
  const [codesEnvironments, setCodesEnvironments] = useState<SelectItem[]>([]);
  const [codesDatacenters, setCodesDatacenters] = useState<SelectItem[]>([]);
  const [codesPreorderTypes, setCodesPreorderTypes] = useState<SelectItem[]>(
    []
  );
  const [configurationId, setConfigurationId] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    async function searchData() {
      try {
        const results = await Preorder.search();
        const configurations = await Configuration.search();
        const environments = await Environment.search();

        if (results) {
          setData(results.results as Server.Preorder[]);
          setCount(results.count);
        }

        setCodesConfigurations(
          (configurations?.results as Server.Configuration[]).map((el) => ({
            value: el.id,
            label: el.code,
          }))
        );

        setCodesEnvironments(
          (environments?.results as Server.Environment[]).map((el) => ({
            value: el.id,
            label: el.code,
          }))
        );
      } catch (error: Error) {
        console.error(error);
      }

      setCodesDatacenters(
        (datacenters?.results as)=> ({
          ["value"]: el.id,
          ["label"]: el.code,
        }))
      );
      } catch (error: Error){
        console.error(error);
      };
      )
    }
    searchData();

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

  const columns: GridColDef<Server.Preorder>[] = [
    {
      headerName: "ID",
      field: "id",
      width: 70,
    },
    {
      headerName: "Рег.номер",
      field: "regNumber",
      width: 200,
      renderCell: (params) => (
        <Link to={`/preorders/${params.row.id}`}>{params.value}</Link>
      ),
    },
    {
      headerName: "configurationId",
      field: "configurationId",
      width: 200,
      renderCell: (params) =>
        codesConfigurations.find(
          (codeConfiguration) =>
            codeConfiguration.value === params.row.configurationId
        )?.label,
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
    },
  ];

  useEffect(() => {
    async function filter() {
      const results = await Preorder.search({
        regNumber,
        configurationId,
      });

      setData(results.results);
      setCount(results.count);
    }

    filter();
  }, [regNumber, configurationId]);

  return (
    <>
      <Header
        title="Потребности"
        actions={
          <>
            <Button variant="contained" endIcon={<Add />}>
              Создать
            </Button>
          </>
        }
      />
      <List
        sx={{
          width: "100%",
          maxWidth: 1000,
          bgcolor: "background.paper",
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
            <ListItemButton sx={{ pl: 4, maxWidth: 700 }}>
              <Box display="flex">
                <Box flexBasis="200px" mr="2">
                  <FormControl fullWidth>
                    <TextField
                      className="filter__select"
                      placeholder="Начните ввод номера"
                      label="Рег. номер:"
                      value={regNumber}
                      onChange={async (el) => {
                        setRegNumber(el.target.value);
                      }}
                    />
                  </FormControl>
                </Box>
                <Box flexBasis="200px" mr="2">
                  <FormControl fullWidth>
                    <InputLabel id="configurations">Конфигурация:</InputLabel>
                    <Select
                      className="filter__select"
                      labelId="configurations"
                      label="Конфигурация:"
                      value={configurationId}
                      onChange={(el) => {
                        setConfigurationId(el.target.value);
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(codesConfigurations || []).map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
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
                        Preorder.search({
                          environmentId: el.target.value,
                        }).then((results) => {
                          setData(results.results);
                          setCount(results.count);
                        });
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(codesEnvironments || []).map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
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
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(STATUSES || []).map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
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
                        Preorder.search({
                          datacenterIds: el.target.value,
                        }).then((results) => {
                          setData(results.results);
                          setCount(results.count);
                        });
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(codesDatacenters || []).map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
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
                        Preorder.search({
                          preorderTypeId: el.target.value,
                        }).then((results) => {
                          setData(results.results);
                          setCount(results.count);
                        });
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(codesPreorderTypes || []).map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
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
      </List>
      <>
        <div className="countData">Найдено: {count}</div>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          checkboxSelection
          disableColumnFilter
        />
      </>
    </>
  );
}
