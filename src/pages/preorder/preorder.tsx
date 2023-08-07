import {useTheme} from "@emotion/react";
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
import {deepOrange} from "@mui/material/colors";
import * as React from "react";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {
  Configuration,
  Environment,
  Preorder as PreorderModel,
} from "../../models";
import type {Server} from "../../typings";

export function Preorder ({children}: PreorderProps) {
  const [data, setData] = useState<Server.Preorder>();
  const [codesConfigurations, setCodesConfigurations] = useState();
  const [codesEnvironments, setCodesEnvironments] = useState();
  const params = useParams();
  const [configurationId, setConfigurationId] = useState();
  const [environmentId, setEnvironmentId] = useState();  

  useEffect(() => {
    async function getData () {
      try {
        if (params.id) {
          const result: Server.Preorder = await PreorderModel.get(
            Number(params.id)
          );
          setData(result);
          setConfigurationId(result.configurationId);
          setEnvironmentId(result.environmentId);
        }
      } catch (error: Error) {
        console.error(error);
      }
    }

    getData();

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
          sx={{bgcolor: deepOrange[500], width: 56, height: 56}}
        ></Avatar>
        <Typography variant="h6" noWrap component="div">
          <Typography variant="h5" noWrap component="div">
            X86-1
          </Typography>
          Редактирование потребности
        </Typography>
        <Button variant="contained" color="success" size="small">
          Success
        </Button>
      </Stack>
      <Box display="flex">
        <Box flexBasis="200px" mr="2" mt="50px">
          <FormControl fullWidth>
            <InputLabel id="configurations">Конфигурация:</InputLabel>
            <Select
              labelId="configurations"
              label="Конфигурация:"
              value={configurationId}
              onChange={(el) => {
                setConfigurationId(el.target.value);
              }}
            >
              {(codesConfigurations || []).map(({value, label}) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box flexBasis="200px" ml="50px" mt="50px">
          <FormControl fullWidth>
            <InputLabel id="environments">Среда:</InputLabel>
            <Select
              labelId="environments"
              label="Среда:"
              onChange={(el) => {
                setEnvironmentId(el.target.value);
              }}
            >
              {(codesEnvironments || []).map(({value, label}) => (
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
        onClick={async () => {
          if (params.id) {
            alert("Изменения сохранены");
            await PreorderModel.update(Number(params.id), {
              ...data,
              configurationId,
              environmentId,
            } as Server.Preorder);
          } else {
            alert("Потребность создана");
            await PreorderModel.create({
              ...data,
              configurationId,
              environmentId,
            } as Server.Preorder);
          }
        }}
      >
        Сохранить
      </Button>
      <Link to="/preorders">Закрыть</Link>
      <Button
        onClick={() => {
          alert("Элемент удален/Вы точно хотите удалить элемент?");
        }}
      >
        Удалить
      </Button>
    </>
  );
}
