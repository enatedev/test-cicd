import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {LEAGUE_STANDING} from '../../utils/example/league-standing';
import Global from '../../../global.module.scss';
import { GetLeagueStandingByLeagueId } from '../../utils/function';
import { I18n } from 'react-redux-i18n';

interface Data {
  rank: number;
  teamId: string;
  teamName: string;
  teamLogo: string;
  totalCount: number;
  winCount: number;
  drawCount: number;
  loseCount: number;
  getScore: number;
	recent: number;
  recentSixthResult: number;
  recentSecondResult: number;
  recentThirdResult: number;
  recentFourthResult: number;
  recentFifthResult: number;
}

function createData(
  rank: number,
  teamId: string,
  teamName: string,
  teamLogo: string,
  totalCount: number,
  winCount: number,
  drawCount: number,
  loseCount: number,
  getScore: number,
	recent: number,
	recentSixthResult: number,
  recentSecondResult: number,
  recentThirdResult: number,
  recentFourthResult: number,
  recentFifthResult: number,
): Data {
  return {
    rank,
    teamId,
    teamName,
		teamLogo,
    totalCount,
    winCount,
    drawCount,
    loseCount,
    getScore,
		recent,
		recentSixthResult,
		recentSecondResult,
		recentThirdResult,
		recentFourthResult,
		recentFifthResult,
  };
}

let rows = [];



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
	width?: string;
}

const RecentComponent = (props) => {
	const {title, color} = props;
	return (
		<div style={{
			backgroundColor: color,
			color: '#fff',
			width: '23px',
			height: '23px',
			borderRadius: '4px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			}}>
			{title}
		</div>
	);
}

const recentToHTML = (recent) => {
	switch (recent) {
		case 0: return (<RecentComponent title={'W'} color={'#05A840'}/>)
		case 1: return (<RecentComponent title={'D'} color={'#F3A000'}/>)
		case 2: return (<RecentComponent title={'L'} color={'#DC0100'}/>)
		case null: return (<RecentComponent title={'?'} color={'#a5a4a4'}/>)
		default:
			break;
	}
	return(<></>);
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: any, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const headCells: readonly HeadCell[] = [
    {
      id: 'rank',
      numeric: true,
      disablePadding: true,
      label: '#',
      width: '50px'
    },
    {
      id: 'teamName',
      numeric: false,
      disablePadding: true,
      label: I18n.t("team"),
    },
    {
      id: 'totalCount',
      numeric: true,
      disablePadding: false,
      label: 'TR',
    },
    {
      id: 'winCount',
      numeric: true,
      disablePadding: false,
      label: 'W',
    },
    {
      id: 'drawCount',
      numeric: true,
      disablePadding: false,
      label: 'D',
    },
    {
      id: 'loseCount',
      numeric: true,
      disablePadding: false,
      label: 'L',
    },
    {
      id: 'getScore',
      numeric: true,
      disablePadding: false,
      label: 'Đ',
    },
    {
      id: 'recent',
      numeric: true,
      disablePadding: false,
      label: I18n.t("form"),
    },
  ];
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: any) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
						sx={{width: headCell.width ?? 'auto'}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
							sx={{transform: 'translateX(1em)'}}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const LeagueStandingComponent = (props) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('rank');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(-1);
  const [line, setLine] = React.useState(rows);
  const {leagueId} = props;

  React.useEffect(() => {
    // Define the API call function
    const fetchData = async () => {
      try {
        const data = {
          leagueId: leagueId,
        };

        const response: any = await GetLeagueStandingByLeagueId(data);
        console.log(response.data[0]);
        
        rows = response.data[0].totalStandings.map(
          (team, index) => {            
            const teamMapped = getTeamById(response.data[0].teamInfos, team.teamId);

            return createData(
              index + 1, 
              team.teamId, 
              teamMapped.name,
              teamMapped.logo,
              team.totalCount, 
              team.winCount, 
              team.drawCount, 
              team.loseCount, 
              (team.winCount * 3) + team.drawCount,
              0 - (team.recentSixthResult + team.recentSecondResult + team.recentThirdResult + team.recentFourthResult + team.recentFifthResult),
              team.recentSixthResult,
              team.recentSecondResult,
              team.recentThirdResult,
              team.recentFourthResult,
              team.recentFifthResult,
            )
          }
        )     
        setLine(rows)   
      } catch (error) {
      } finally {
      }
    };
    fetchData();    
  }, []); 

  const getTeamById = (rows, teamId) => {    
    return rows.find((team) => team.teamId === teamId);
  }
  
  // const mappingData = (rows, data) => {
  //   if (!data) {
  //     return;
  //   }
  //   return [...rows, 
  //     ...data.]
  // }

  const handleRequestSort = (
    event: any,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  
  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const visibleRows = React.useMemo(
    () =>
      stableSort(line, getComparator(order, orderBy)),
    [order, orderBy, page, rows],
  );				

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
						stickyHeader
            sx={{ minWidth: 750 }}
						padding="none"
            aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody 
						className={Global.TextBaseDark}
						sx={{
							'& .MuiTableCell-root': {
								padding: '7px 0'
							}
						}}>
              {console.log(visibleRows)
              }
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;								
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
											className={Global.TextBaseDark}
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
											align="center"
                    >
                      {row.rank}
                    </TableCell>
                    <TableCell className={Global.TextBaseDark} align="left" sx={{display: 'flex', alignItems: 'center', paddingLeft: '1em !important'}}>
											<div style={{width: '30px', height: '30px', display: 'inline-block', marginRight: '7px'}}>
												<img style={{ marginBottom: 0 }} width='100%' src={row.teamLogo} alt="" />
											</div>
											&nbsp;{row.teamName}
										</TableCell>
                    <TableCell className={Global.TextBaseDark} align="center">{row.totalCount}</TableCell>
                    <TableCell className={Global.TextBaseDark} align="center">{row.winCount}</TableCell>
                    <TableCell className={Global.TextBaseDark} align="center">{row.drawCount}</TableCell>
                    <TableCell className={Global.TextBaseDark} align="center">{row.loseCount}</TableCell>
                    <TableCell className={Global.TextBaseDark} align="center">{row.getScore}</TableCell>
                    <TableCell className={Global.TextBaseDark} align="center">
											<div style={{display: 'flex', gap: '2px', flexDirection: 'row-reverse', justifyContent: 'center'}}>
												{recentToHTML(row.recentSecondResult)}
												{recentToHTML(row.recentThirdResult)}
												{recentToHTML(row.recentFourthResult)}
												{recentToHTML(row.recentFifthResult)}
												{recentToHTML(row.recentSixthResult)}
												{recentToHTML(null)}
											</div>
										</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default LeagueStandingComponent;
