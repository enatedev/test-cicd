import { EVENT_MAPPING } from "../../utils/contants";
import Styles from "./eventComponent.module.scss";
import Global from "../../../global.module.scss";
import clsx from "clsx";
import NoDataElement from "../NoDataComponent";
import { I18n } from "react-redux-i18n";
import { useEffect, useState } from "preact/hooks";
import { store } from "../../redux/store";
import { getEventFixture } from "../../redux/actions/fixtureAction";

const EventComponent = (props: any) => {
  const { fixture } = props;  
  const [listEvents, setListEvents] = useState(fixture.events);
  const [liveEvents, setLiveEvents] = useState(fixture.events)
  const [isLive,setIsLive] = useState(false)
  
  // useEffect(() => {
  //   const ws = new WebSocket(
  //     "ws://ec2-18-232-186-210.compute-1.amazonaws.com:8080"
  //   );

  //   ws.onopen = () => {
  //     // console.log("Connected to server");

  //     const message = JSON.stringify({
  //       routes: "events",
  //       params: { matchId: fixture.fixtures.matchId },
  //     });

  //     ws.send(message);
  //   };

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     // console.log(data);
      
  //     if(data.length > 0) {
  //       setLiveEvents(data[0])
  //       setIsLive(true)
  //     }
  //   };

  //   ws.onclose = () => {
  //     // console.log("Disconnected from server");
  //   };

  //   // Cleanup function
  //   return () => {
  //     ws.close();
  //   };

  // }, []);

  if (isLive) {
    return createSummaryElement(liveEvents);
  } else {
    if (listEvents.length > 0) {
      return createSummaryElement(listEvents[0]);
    } 
  }
  return <NoDataElement />;
};

const createSummaryElement = (events: any) => {  

  if(!events.events) {
    return <NoDataElement />;
  }
  
  const firstHalfEvents = events.events.filter((event) => event.minute <= 45);
  const secondHalfEvents = events.events.filter((event) => event.minute > 45);
  
  const renderEvents = (events: any) => {
    return events.map((event, index) => (
      <div
        key={index}
        className={
          event.homeEvent ? clsx(Styles.HomeEvent, Styles.Event) : Styles.Event
        }
      >
        <span className={Global.TextBaseDark}>{event.minute}'</span>
        <img
          src={EVENT_MAPPING[event.type].iconImgLink}
          style={{ height: "20px", width: "20px", margin: "0 7px" }}
        />
        <span className={Global.TextBaseDark}>{event.playerName}</span>
      </div>
    ));
  };

  return (
    <div className={Styles.EventComponent}>
      <div>
        <div
          className={Global.TextBaseDark}
          style={{ maxHeight: "275px", overflow: "scroll" }}
        >
          {firstHalfEvents.length > 0 && (
            <div className={Styles.EventWrapper}>
              <div className={Styles.Title}>{I18n.t("half_time")}</div>
              <div className={Styles.EventList}>
                {renderEvents(firstHalfEvents)}
              </div>
            </div>
          )}
          {secondHalfEvents.length > 0 && (
            <div className={Styles.EventWrapper}>
              <div className={Styles.Title}>{I18n.t("second_half_time")}</div>
              <div className={Styles.EventList}>
                {renderEvents(secondHalfEvents)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
