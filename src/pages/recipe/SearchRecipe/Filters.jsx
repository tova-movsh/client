import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Stack, Paper, Autocomplete, TextField, Divider } from '@mui/material';
import Input from '@mui/joy/Input';
import SelectedFilter from './SelectedFilter';
import { red } from '@mui/material/colors';

function Filters({ where, setWhere }) {

  const [ingredients, setiIngredients] = useState([{ name: "aaa" }, { name: "bbdrgs" }, { name: "cccg" }]);
  const [types, setTypes] = useState([]);
  const [diets, setDiets] = useState([]);

  useEffect(() => {

    async function fetchData() {
      let config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } }

      const { data: _ingredients } = await axios.get("http://localhost:3600/api/ingredient", config)
      if (_ingredients?.length) setiIngredients(_ingredients)

      const { data: _categories } = await axios.get("http://localhost:3600/api/category", config)
      if (_categories?.length) setTypes(_categories)

      const { data: _tags } = await axios.get("http://localhost:3600/api/tag", config)
      if (_categories?.length) setDiets(_tags)

    }
    fetchData()
  }, [])

  return (
    <Paper elevation={16}
      sx={{
        marginRight: 'auto',
        marginLeft: 'auto',
        textAlign: 'center',
        boxShadow: 1,
        borderRadius: 2,
        backgroundColor: 'pink',
        width: "90%",
        margin: 5,
        padding: 2
      }}>
      <h1>filter</h1>
      <div>
        <Input placeholder="something yummy is coming..." variant="outlined" color="danger" sx={{ margin: 5 }} />
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} >
          <Autocomplete
            multiple
            limitTags={0}
            options={ingredients}
            getOptionLabel={(option) => option.name}
            value={where.includeIngredients}
            renderInput={(params) => (
              <TextField {...params} label="includeIngredients" placeholder="includeIngredients" />
            )}
            sx={{ width: '350px', borderColor: "#ff0000" }}
            onChange={(event, values) => { setWhere({ ...where, includeIngredients: values }) }}
          />
          <Autocomplete
            multiple
            limitTags={0}
            options={ingredients}
            getOptionLabel={(option) => option.name}
            value={where.excludeIngredients}
            renderInput={(params) => (
              <TextField {...params} label="exclude Ingredients" placeholder="exclude Ingredients" />
            )}
            sx={{ width: '350px' }}
            onChange={(event, values) => { setWhere({ ...where, excludeIngredients: values }) }}

          />
          <Autocomplete
            multiple
            limitTags={0}
            defaultValue={where.selectedDiets}
            options={diets}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="diets" placeholder="diets" />
            )}
            onChange={(event, values) => { setWhere({ ...where, selectedDiets: values }) }}
            sx={{ width: '350px' }}
          />
          <Autocomplete
            multiple
            limitTags={0}
            options={types}
            getOptionLabel={(option) => option.name}
            value={where.selectedTypes}
            renderInput={(params) => (
              <TextField {...params} label="types" placeholder="types" />
            )}
            sx={{ width: '250px' }}
            onChange={(event, values) => { setWhere({ ...where, selectedTypes: values }) }}

          />
          <Autocomplete
            limitTags={1}
            options={["less than 15 min", "less than 30 min", "less than 45 min", "less than 60 min"]}
            getOptionLabel={(option) => option}
            value={where.maxReadyTime}
            renderInput={(params) => (
              <TextField {...params} label="Cook and Prep. Time" placeholder="Cook and Prep. Time" />
            )}
            sx={{ width: '350px', borderBlockColor: 'red' }}
            onChange={(event, value) => { debugger; setWhere({ ...where, maxReadyTime: value }) }}
          />

        </Stack>
       
        {<Divider variant="middle" sx={{ padding: 2 }} />}
        <div style={{ flexWrap: "wrap", justifyContent: "flex-start", display: "flex"}}> {where.includeIngredients?.length != 0 &&
          <SelectedFilter name="includeIngredients" where={where} setWhere={setWhere}></SelectedFilter>}
        {where.excludeIngredients?.length != 0 &&
          <SelectedFilter name="excludeIngredients" where={where} setWhere={setWhere}></SelectedFilter>}
        {where.selectedDiets?.length != 0 &&
          <SelectedFilter name="selectedDiets" where={where} setWhere={setWhere}></SelectedFilter>}
        {where.selectedTypes?.length != 0 &&
          <SelectedFilter name="selectedTypes" where={where} setWhere={setWhere}></SelectedFilter>}
     </div> </div>
    </Paper>
  )
}
export default Filters