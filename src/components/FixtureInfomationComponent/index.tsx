import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { IFixture } from "../../redux/interfaces";
import { I18n } from "react-redux-i18n";

const FixtureInformationComponent = () => {
  const fixture: IFixture = useSelector((state: any) => state.fixtureReducer);

  const information = {  field: 'Anfield, Liverpool, UK',
  referee: 'Lorem Ipsum',
  temperature: '60°F / 15°C',
  weather: '🌥️ Nhiều Mây',
  wind: '10/mph',
  humidity: '65%',
  rain: '20%',};

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell align="center">{I18n.t("arena")}</TableCell>
            <TableCell align="center">{I18n.t("referee")}</TableCell>
            <TableCell align="center">{I18n.t("temperature")}</TableCell>
            <TableCell align="center">{I18n.t("weather")}</TableCell>
            <TableCell align="center">{I18n.t("wind")}</TableCell>
            <TableCell align="center">{I18n.t("humidity")}</TableCell>
            <TableCell align="center">
              {I18n.t("probability_of_rain")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">{information.field}</TableCell>
            <TableCell align="center">{information.referee}</TableCell>
            <TableCell align="center">{information.temperature}</TableCell>
            <TableCell align="center">{information.weather}</TableCell>
            <TableCell align="center">{information.wind}</TableCell>
            <TableCell align="center">{information.humidity}</TableCell>
            <TableCell align="center">{information.rain}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FixtureInformationComponent;
