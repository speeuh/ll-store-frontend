import { InputLabel, FormControl, Select, MenuItem } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";


interface Props {
  filteredSection: string | null;
  setFilteredSection: React.Dispatch<React.SetStateAction<string | null>>
}

export default function Button({filteredSection, setFilteredSection}: Props) {
  const [sections, setSections] = useState<Record<any, any>>([]);

  useEffect(() => {
    const api = async () => {
      const { data } = await axios.get("http://localhost:8080/sections/list");
      setSections(data);
    };
    api();
  }, []);

  const handleSelect = (e) => {
    e.preventDefault();
    setFilteredSection(e.target.value);
  };

  return (  

    <FormControl>
            <InputLabel> Sections </InputLabel>
            <Select
              labelId='demo-simple-select-autowidth-label'
              id='demo-simple-select-autowidth'
              label='sections'
              onChange={handleSelect}
            >

              {sections.map((item ) => (
                 (  <MenuItem value={item.id}>{item.name}</MenuItem>)
                 ))}

            </Select>
          </FormControl>
  );
}
