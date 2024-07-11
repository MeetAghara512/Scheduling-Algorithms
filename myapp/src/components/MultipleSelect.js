import React from 'react';
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AppContext } from '../context/AppContext';
import './GeneralFile.css';


export default function BasicSelect() {
      const { setType } = useContext(AppContext);
      const [algorithm, setAlgorithm] = useState('');

      const handleChange = (event) => {
            setAlgorithm(event.target.value);
            setType(event.target.value);
      };

      return (
            <div className='InMultipleSelect'>

                  <Box sx={{ width: 400 }} >
                        <FormControl fullWidth className='formcontrol'>
                              <InputLabel id="demo-simple-select-label" className='algorithm'>Algorithm</InputLabel>
                              <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={algorithm}
                                    label="Algorithm"
                                    onChange={handleChange}
                              >
                                    <MenuItem value={'FCFS'}>First Come First Serve (FCFS)</MenuItem>
                                    <MenuItem value={'SJF'}>Shortest Job First (SJF)</MenuItem>
                                    <MenuItem value={'SRTF'}>Shortest Remaining Time First (SRTF)</MenuItem>
                                    <MenuItem value={'RR'}>Round Robin (RR)</MenuItem>
                                    <MenuItem value={'NPPS'}>Not Preemptive Priority Scheduling (NPPS)</MenuItem>
                                    <MenuItem value={'PPS'}>Preemptive Priority Scheduling (PPS)</MenuItem>
                              </Select>
                        </FormControl>
                  </Box>
            </div>
      );
}
