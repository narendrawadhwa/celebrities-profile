import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function SimpleAccordion({ person }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Avatar src={person.picture} alt={person.first} />
        <Typography>{person.first} {person.last}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <img src={person.picture} alt={person.first} />
          <Typography>Age: {person.age}</Typography>
          <Typography>Gender: {person.gender}</Typography>
          <Typography>Country: {person.country}</Typography>
          <Typography>Description: {person.description}</Typography>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default SimpleAccordion;
