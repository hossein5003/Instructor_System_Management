import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useEffect, useState} from "react";

export default function SimpleAccordion({title, additionalInformation, data}) {
    const [state, setState] = useState([]);

    useEffect(() => {
        setState(data)
    }, data)

    const returnEachCourse = (record) => {
        return (
            <Accordion key={record.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>{record[title]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Name : {record[title]}
                    </Typography>
                    <Typography>
                        {additionalInformation}: {record[additionalInformation]}
                    </Typography>
                    <Typography>
                        Department Name : {record.deptName}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        )
    }

    return (
        <div>
            {
                state.map(record => returnEachCourse(record))
            }
        </div>
    );
}
