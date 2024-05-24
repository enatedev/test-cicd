import Styles from './teamLogoNameComponent.module.scss'

const TeamLogoName = (props) => {

    const {logo, name} = props;

    return(
        <div className={Styles.TeamLogoName}>
            <div className={Styles.TeamLogo}><img src={logo} alt="" /></div>
            <div className={Styles.TeamName}><span>{name}</span></div>
        </div>
    )
}

export default TeamLogoName;