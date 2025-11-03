import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function PlayersTable({ players = [] }) {
  return (
    // dark Paper so the table fits the app dark theme
    <TableContainer component={Paper} className="shadow-md bg-gray-800 text-white">
      <Table sx={{ minWidth: 700 }} aria-label="players table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Rk</StyledTableCell>
            <StyledTableCell>Player</StyledTableCell>
            <StyledTableCell align="right">Team</StyledTableCell>
            <StyledTableCell align="right">Pos</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">PTS</StyledTableCell>
            <StyledTableCell align="right">AST</StyledTableCell>
            <StyledTableCell align="right">REB</StyledTableCell>
            <StyledTableCell align="right">FG%</StyledTableCell>
            <StyledTableCell align="right">3P%</StyledTableCell>
            <StyledTableCell align="right">FT%</StyledTableCell>
             <StyledTableCell align="right">Awards</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((p) => (
            <StyledTableRow key={p.id ?? `${p.player}-${p.team}`}> 
              <StyledTableCell component="th" scope="row">
                {p.rk}
              </StyledTableCell>
              <StyledTableCell>{p.player}</StyledTableCell>
              <StyledTableCell align="right">{p.team}</StyledTableCell>
              <StyledTableCell align="right">{p.pos}</StyledTableCell>
              <StyledTableCell align="right">{p.age}</StyledTableCell>
              <StyledTableCell align="right">{p.pts}</StyledTableCell>
              <StyledTableCell align="right">{p.ast}</StyledTableCell>
              <StyledTableCell align="right">{p.trb}</StyledTableCell>
              <StyledTableCell align="right">{p.fgPercent}</StyledTableCell>
              <StyledTableCell align="right">{p.threePPercent}</StyledTableCell>
              <StyledTableCell align="right">{p.ftPercent}</StyledTableCell>
              <StyledTableCell align="right">{p.awards}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Memoize to avoid re-rendering the large table when parent updates (e.g., typing in search)
export default React.memo(PlayersTable);
