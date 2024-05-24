import React, { useState } from "react";
// import Select from "@mui/material/Select";
import { MenuItem, Typography, Box, Select } from "@mui/material";
import Styles from "./selectComponent.module.scss";
import GlobalStyles from "../../../global.module.scss";
import clsx from "clsx";

const SelectComponent = (props: any) => {
  const { className, data, onChange, setBookmaker, value } = props;
  const [selectedValue, setSelectedValue] = useState(value ?? data[0]?.id);
  
  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);

    if (setBookmaker) {
      setBookmaker(event.target.value);
    } 
    
    // call the callback if exists
    if (onChange) { onChange(event); }
  }

  return (
    <Select
      className={clsx(
        Styles.SelectContainer,
        GlobalStyles.TextLight,
        className
      )}
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={selectedValue}
      onChange={handleChange}
    >
      {data &&
        data.length > 0 &&
        data.map((item: any, index: number) => (
          <MenuItem className={Styles.MenuItem} value={item.id}>
            {item?.image && (
              <Box className={Styles.BoxItemImage}>
                <img width={item.width} height={item.height} src={item.image} />
                <Typography
                  className={clsx(
                    GlobalStyles.FontMontserrat,
                    GlobalStyles.FontSizeSmall,
                    GlobalStyles.FontWeight600,
                    GlobalStyles.TextDark
                  )}
                >
                  /
                </Typography>
              </Box>
            )}
            <Typography
              className={clsx(
                GlobalStyles.FontMontserrat,
                GlobalStyles.FontSizeSmall,
                GlobalStyles.FontWeight600,
                GlobalStyles.TextDark
              )}
            >
              {item.name}
            </Typography>
          </MenuItem>
        ))}
    </Select>
  );
};

export default React.memo(SelectComponent);
