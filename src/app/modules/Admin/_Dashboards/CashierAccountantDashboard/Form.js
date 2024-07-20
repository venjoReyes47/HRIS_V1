import React from "react";
import STable from "../../../../../_metronic/layout/components/custom/table/STable";
import LineChart from "../../../../../_metronic/layout/components/custom/chart/line-chart";
import GraphChart from "../../../../../_metronic/layout/components/custom/chart/graph-chart";
import DoughnutChart from "../../../../../_metronic/layout/components/custom/chart/dougnut-chart";

export default function Form(props) {


    console.log(props.instituteStatistics)

    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-3">
                    <a className="card1 pb-0" href="#">
                        <h3 className="h3-card">{props.totalEnrolled}</h3>
                        <p className="small p-card">Enrolled Students</p>
                        <div className="go-corner" href="#">
                            <div className="go-arrow">
                                →
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-12 col-lg-3">
                    <a className="card1 pb-0" href="#">
                        <h3 className="h3-card">{props.totalAssessed}</h3>
                        <p className="small p-card">Assessed Students</p>
                        <div className="go-corner" href="#">
                            <div className="go-arrow">
                                →
                            </div>
                        </div>
                    </a>
                </div>


                <div className="col-12 col-lg-3">
                    <a className="card1 pb-0" href="#">
                        <h3 className="h3-card">{props.totalInquires}</h3>
                        <p className="small p-card">Inquired Students</p>
                        <div className="go-corner" href="#">
                            <div className="go-arrow">
                                →
                            </div>
                        </div>
                    </a>
                </div>


                <div className="col-12 col-lg-3">
                    <a className="card1 pb-0" href="#">
                        <h3 className="h3-card">{props.totalProcessed}</h3>
                        <p className="small p-card">Processed Students</p>
                        <div className="go-corner" href="#">
                            <div className="go-arrow">
                                →
                            </div>
                        </div>
                    </a>
                </div>


            </div>


            <div className="row mt-5">


                <div className="col-12 col-lg-6">
                    <div className="card text-center">
                        <div className="card-header lead">Weekly Enrollment Statistics</div>
                        <div className="card-body pt-3">
                            <LineChart data={props.weeklyEnrollmentChartLabel} />
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="card text-center">
                        <div className="card-header lead">Enrollment Statistic Today</div>
                        <div className="card-body pt-3">
                            <LineChart data={props.dailyEnrollmentChartLabel} />

                        </div>
                    </div>
                </div>


            </div>


            <div className="row mt-5">

                <div className="col-12">
                    <div className="card text-center">
                        <div className="card-header lead">Enrolled per Institute</div>
                        <div className="card-body pt-3">
                            <LineChart data={props.institutesPerCourseLabel} />

                        </div>
                    </div>
                </div>


            </div>


            <div className="row mt-5">

                <div className='col-12'>
                    <div className="card text-center">
                        <div className="card-header  lead">Statistics</div>
                        <div className="card-body">
                            {<STable data={props.instituteStatistics} />}
                        </div>
                    </div>
                </div>

            </div>


            <div className="row mt-5">

                <div className="col-12 col-lg-6">
                    <div className="card text-center">
                        <div className="card-header lead">Enrollment Statistics</div>
                        <div className="card-body pt-3">
                            <GraphChart data={props.enrollmentStatisticLabel} />
                        </div>
                    </div>
                </div>


                <div className="col-12 col-lg-6">
                    <div className="card text-center">
                        <div className="card-header lead">Monthly Enrollment Statistics</div>
                        <div className="card-body pt-3">
                            <LineChart data={props.monthlyEnrollmentStatisticLabel} />

                        </div>
                    </div>
                </div>

            </div>


            {/* <div className="row mt-5">

                <div className="col-12 col-lg-6">
                    <div className="card text-center">
                        <div className="card-header lead">Verification Statistic</div>
                        <div className="card-body pt-3">
                            <DoughnutChart data={props.verificationStatistic} />
                        </div>
                    </div>
                </div>




            </div> */}
        </>
    )
}