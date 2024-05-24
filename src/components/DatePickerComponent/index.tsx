import React, { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Styles from "./datePickerComponent.module.scss";
import moment from "moment";
import GlobalStyles from "../../../global.module.scss";
import clsx from "clsx";
import { I18n } from "react-redux-i18n";
import { store } from "../../redux/store";
import { getFixturesByDate } from "../../redux/actions/fixtureAction";
import { useSelector } from "react-redux";
import { setLoading } from "../../../src/redux/actions/loadingAction";

const DatePickerComponent = () => {
  const isLoading = useSelector((state: any) => state.loadingReducer.loading);
  const locale = useSelector((state: any) => state.i18n);
  const todayFormatted = moment().format("YYYY-MM-DD");
  const minDate = moment().subtract(7, "days").format("YYYY-MM-DD");
  const maxDate = moment().add(7, "days").format("YYYY-MM-DD");
  const dates = Array.from({ length: 15 }, (_, i) =>
    moment()
      .add(i - 7, "days")
      .format("YYYY-MM-DD")
  );
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const handleDateChange = (type: any) => {
    store.dispatch(setLoading(true));
    setSelectedDate((currentDate) => {
      const modifiedDate = moment(currentDate);
      const newDate =
        type === "increment"
          ? modifiedDate.add(1, "days").format("YYYY-MM-DD")
          : modifiedDate.subtract(1, "days").format("YYYY-MM-DD");
      if (
        moment(newDate).isBefore(minDate) ||
        moment(newDate).isAfter(maxDate)
      ) {
        return currentDate;
      }
      const data = {
        date: newDate,
      };
      store
        .dispatch(getFixturesByDate(data))
        .then(() => store.dispatch(setLoading(false)));
      return newDate;
    });
  };

  const handleSelectDate = (value: string) => {
    store.dispatch(setLoading(true));
    const data = {
      date: value,
    };
    store
      .dispatch(getFixturesByDate(data))
      .then(() => store.dispatch(setLoading(false)));
    setSelectedDate(value);
  };

  const formatDate = (date: string) => {
    return moment(date).format("DD-MM-YYYY");
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        {isLoading ? (
          <CircularProgress className={Styles.Spinner} />
        ) : (
          <Box
            className={Styles.DatePickerBox}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              className={Styles.DatePickerLeftButton}
              onClick={() => handleDateChange("decrement")}
            >
              <ArrowLeftIcon />
            </Typography>

            <Select
              className={Styles.SelectBoxDate}
              labelId="date-selector-label"
              value={selectedDate}
              onChange={(e: any) => handleSelectDate(e.target.value)}
            >
              {dates.map((date, index) => (
                <MenuItem className={Styles.MenuItem} key={index} value={date}>
                  <Typography
                    className={clsx(
                      GlobalStyles.FontMontserrat,
                      GlobalStyles.FontWeight600,
                      GlobalStyles.FontSizeSmall,
                      GlobalStyles.TextDark
                    )}
                  >
                    {date === todayFormatted ? I18n.t("today") : formatDate(date)}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
            <Typography
              className={Styles.DatePickerRightButton}
              onClick={() => handleDateChange("increment")}
            >
              <ArrowRightIcon />
            </Typography>
          </Box>
        )}

        <Typography
          className={clsx(
            GlobalStyles.TextLight,
            GlobalStyles.FontMontserrat,
            GlobalStyles.FontSizeSmall,
            GlobalStyles.FontWeight600
          )}
        >
          {moment(selectedDate).format("MMMM DD, YYYY")}
        </Typography>
      </Box>
    </LocalizationProvider>
  );
};

export default React.memo(DatePickerComponent);
