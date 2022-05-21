import React, {useEffect} from "react";
import {
    Box,
    Grid, Icon,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

const StyledBody = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`

const DataTable = ({firstColumn, secondColumn, data, type}) => {
    const navigate = useNavigate();

    const createButton = (type) =>
        <Button variant="text" onClick={() => navigate(`/${type}`)}>
            Create new {type}
        </Button>

    const returnRecord = (record) => {
        return (
            <TableRow component={Link} to={`/${type}/${record.id}`} hover key={record.id}>
                <TableCell align={'center'}>{record[firstColumn]}</TableCell>
                <TableCell align={'center'}>{record[secondColumn]}</TableCell>
            </TableRow>
        )
    }

    return (
        <StyledBody>
            <Grid item xs={10}>
                {createButton(type)}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align={'center'}>{firstColumn}</TableCell>
                                <TableCell align={'center'}>{secondColumn}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {data.map(record => returnRecord(record))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </StyledBody>
    )
}

export default DataTable;