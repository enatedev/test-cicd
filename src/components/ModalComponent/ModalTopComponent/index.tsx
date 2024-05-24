import Styles from './modalTopComponent.module.scss'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TeamLogoName from '../../TeamLogoNameComponent';
import Home from "../../../../public/home.png";
import Away from "../../../../public/away.png";
import ScoreComponent from '../../ScoreComponent';
import GlobalStyles from "../../../../global.module.scss";
import clsx from 'clsx';
import {RESOURCE_URL} from "../../../utils/contants";
import moment from 'moment';
import 'moment-timezone';
import { useEffect, useState } from 'preact/hooks';


const DateComponent = (props) => {
  
    const {timestamp} = props;
    const date = moment.unix(timestamp).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY');
    const time = moment.unix(timestamp).tz('Asia/Ho_Chi_Minh').format('HH:mm');
    
    return(
        <>
            <span>{date}</span>
            <div className={GlobalStyles.TextRed}>{time}</div>
            <div className={GlobalStyles.TextRed}>(GMT +7)</div>
        </>
    );
  }

const ModalTop = (props) => {
    const {fixture} = props;
    const [homeScore,setHomeScore] = useState(fixture.fixtures.homeScore);
    const [awayScore,setAwayScore] = useState(fixture.fixtures.awayScore);
    const [isLive, setIsLive] = useState(false)
    // useEffect(() => {
    //     const ws = new WebSocket(
    //       "ws://ec2-18-232-186-210.compute-1.amazonaws.com:8080"
    //     );
            
    //     ws.onopen = () => {
    //       // console.log("Connected to server");
    
    //     const message = JSON.stringify({
    //         routes: 'livescores',
    //         params: { matchId: fixture.fixtures.matchId }
    //     });
    
    //       ws.send(message);
    //     };
    
    //     ws.onmessage = (event) => {
    //       const data = JSON.parse(event.data);
    //         // console.log(data);
            
    //       if(data.length > 0 && data.homeScore !== '' && data.awayScore !== '') {
    //         setHomeScore(data.homeScore)
    //         setAwayScore(data.awayScore)
    //         setIsLive(true)
    //       }
    //     };
    
    //     ws.onclose = () => {
    //       // console.log("Disconnected from server");
    //     };
    
    //     // Cleanup function
    //     return () => {
    //       ws.close();
    //     };
    //   }, []);

    return(
        <div className={Styles.ModalTop}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} columns={14}>
                    <Grid className={Styles.Col} xs={5}>
                        
                        <TeamLogoName logo={RESOURCE_URL + 'home.png'} name={fixture.fixtures.homeName} />
                    </Grid>
                    <Grid className={Styles.Col} xs={4}>
                        <div className={clsx(
                            Styles.DuelParticipant,
                            GlobalStyles.TextDark,
                            GlobalStyles.FontWeight600,
                            GlobalStyles.FontSizeMedium,
                            GlobalStyles.FontMontserrat,
                            )}>
                            <div className={Styles.TimeStart}>
                                <DateComponent timestamp={fixture.fixtures.matchTime}/>
                            </div>
                            <div className={clsx(
                                GlobalStyles.FontSizeXLarge,
                                Styles.Score
                                )}>
                                <ScoreComponent score={homeScore}/>
                                <div>-</div>
                                <ScoreComponent score={awayScore}/>
                            </div>
                        </div>
                    </Grid>
                    <Grid className={Styles.Col} xs={5}>
                        <TeamLogoName logo={RESOURCE_URL + 'away.png'} name={fixture.fixtures.awayName} />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default ModalTop;
