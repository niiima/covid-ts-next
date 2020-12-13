//import { ICovidSummary } from '../interfaces/covid.interface'

const CovidSummary = (props) => {
    const { TotalConfirmed,
        TotalDeaths,
        TotalRecovered } = props.summaryInfo;
    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-xl-3 col-md-3 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Total Cases</div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{TotalConfirmed}</div>
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
                <div className="col-xl-3 col-md-3 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">Total Death</div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{TotalDeaths}</div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa fa-bed fa-2x text-danger"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-3 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Total Recovered</div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{TotalRecovered}</div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa fa-child fa-2x text-success"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-xl-3 col-md-3 mb-4">
                   <div className="card border-left-warning shadow h-100 py-2">
                                                       <div className="card-body">
                           <div className="row no-gutters align-items-center">
                               <div className="col mr-2">
                                   <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">New Cases</div>
                                   <div className="row no-gutters align-items-center">
                                   <div className="col-auto">
                                           <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">${new_cases}</div>
                                       </div>
                                                                                       
                                   </div>
                               </div>
                               <div className="col-auto">
                                   <i className="fa fa-bell fa-2x text-warning"></i>
                               </div>
                           </div>
                       </div>
                   </div>
               </div> */}
            </div>
        </div>
    );
}
export default CovidSummary;