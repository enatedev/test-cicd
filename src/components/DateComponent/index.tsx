import moment from 'moment';
const DateComponent = (props) => {
  
  const {timestamp} = props;
  const time = moment(timestamp).format('DD/MM/YYYY');

  return(
    <span>{time}</span>
  );
}

export default DateComponent;