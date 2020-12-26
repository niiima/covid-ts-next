import { RiPulseLine, RiVirusLine, RiStethoscopeLine } from 'react-icons/ri'

const Title = (props) => {
    return (
        <div className="col-xl-3 col-md-3 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body" style={{ padding: "1em" }}>
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-uppercase mb-1" style={{ color: props.color}}>{props.name} {props.icon}</div>
                            <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                    <div className="h5 mb-0 mr-3 font-weight-bold"
                                        style={{ letterSpacing: "0.2em", color: props.color }}>{props.value}

                                    </div>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fa fa-users fa-2x text-info"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const CovidSummary = (props) => {
    const titles = [{
        name: "TotalConfirmed",
        value: props.summaryInfo.TotalConfirmed,
        icon: <RiVirusLine></RiVirusLine>,
        color: "none"
    }, {
        name: "TotalDeaths",
        value: props.summaryInfo.TotalDeaths,
        icon: <RiPulseLine></RiPulseLine>,
        color: "red"
    }, {
        name: "TotalRecovered",
        value: props.summaryInfo.TotalRecovered,
        icon: <RiStethoscopeLine></RiStethoscopeLine>,
        color: "green"
    }];
    return (
        <div className="container-fluid">
            <div className="row">
                {
                    titles.map(item => (<Title
                        name={item.name}
                        value={item.value}
                        key={item.name}
                        icon={item.icon}
                        color={item.color}>
                    </Title>))
                }
            </div>
        </div>
    );
}

export default CovidSummary;