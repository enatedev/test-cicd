import React, { useState } from "react";
import { Link } from "@mui/material";
import { BET_NOW_URL, RESOURCE_URL } from "../../utils/contants";
import { useSelector } from 'react-redux';

const BetNowComponent = () => {
  const locale = useSelector((state: any) => state.i18n)
  const [image, setImage] = useState(RESOURCE_URL + 'bet_now.gif')
  switch (locale.locale) {
    case 'vi':
      setImage(RESOURCE_URL + 'bet_now.gif')
      break;
    case 'en':
      setImage(RESOURCE_URL + 'bet_en.gif')
      break;
    case 'th':
      setImage(RESOURCE_URL + 'bet_thai.gif')
      break;
    default:
      break;
  }

  return (
    <Link href={BET_NOW_URL} target="blank">
      <img height={55} src={image} />
    </Link>
  );
};

export default React.memo(BetNowComponent);
