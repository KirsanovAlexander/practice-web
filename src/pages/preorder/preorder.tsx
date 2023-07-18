import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, Router } from "react-router-dom";
import { Configuration, Environment } from "../../models";


export function Preorder({ children }: PreorderProps) {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [codesConfigurations, setCodesConfigurations] = useState();
  const [codesEnvironments, setCodesEnvironments] = useState();


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
  }, []);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Avatar
          sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}
        >
        </Avatar>
        <Typography
          variant="h6"
          noWrap component="div"
        >
          <Typography
            variant="h5"
            noWrap component="div"
          >
            X86-1
          </Typography>
          Редактирование потребности
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="small"
        >
          Success
        </Button>
      </Stack>
      <Select></Select>
      <Box display="flex">
        <Box
          flexBasis="200px"
          mr="2"
          mt="50px"
        >
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
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          flexBasis="200px"
          ml="50px"
          mt="50px"
        >
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
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box mt="30px">
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label="Описание"
          multiline
          maxRows={4}
        />
      </Box>
      <Button
        onClick={() => {
          alert("Изменения сохранены");
        }}
      >
        Сохранить
      </Button>
      <Link to='/preorders'>Закрыть</Link>
      <Button onClick={() => {
        alert("Элемент удален/Вы точно хотите удалить элемент?");
      }}>
        Удалить
      </Button>
    </>
  );
}
