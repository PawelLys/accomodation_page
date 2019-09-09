import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { departureCalendarDisplay, departureSelectedDate, departureCalendarNode } from '../actions';

class calendarDeparture extends React.Component {
    constructor(props) {
        super(props);
        this.width = props.width || '35rem';
        this.style = props.style || {};
        this.style.width = this.width;

        this.setWrapperRefDepart = this.setWrapperRefDepart.bind(this);
    }

    state = { dateContext: moment(), today: moment(), showMonthPopup: false, showYearPopup: false, 
        selectedMonth: moment().month(), selectedYear: moment().year() };

    componentDidUpdate() {
        if(this.state.showMonthPopup || this.state.showYearPopup) 
            document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    weekdaysShort = moment.weekdaysShort();
    months = moment.months();
    years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];

    year = () => this.state.dateContext.format("Y");

    month = () => this.state.dateContext.format("MMMM");

    daysInMonth = () => this.state.dateContext.daysInMonth();

    currentDate = () => this.state.dateContext.get("date");

    currentDay = () => this.state.dateContext.format("D");

    firstDayOfMonth = () => moment(this.state.dateContext).startOf('month').format('d');

    weekdays = () => {
        return this.weekdaysShort.map(day => {
            return <td key={day} className="week-day">{day}</td>
        });
    };

    nextMonth = () => {
        let dateContext = Object. assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({ dateContext, selectedMonth: moment(dateContext).get('month'), 
            selectedYear: moment(dateContext).get('year') });
        this.props.onNextMonth && this.props.onNextMonth();
    };

    prevMonth = () => {
        let dateContext = Object. assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({ dateContext, selectedMonth: moment(dateContext).get('month'), 
            selectedYear: moment(dateContext).get('year') });
        this.props.onPrevMonth && this.props.onPrevMonth();
    }

    onChangeMonth = () => {
        this.setState({ showMonthPopup: !this.state.showMonthPopup, showYearPopup: false });
    };

    setMonth = (month) => {
        const monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({ dateContext, selectedMonth: monthNo });
    };

    onSelectChange = (e, data) => {
        e.preventDefault();
        this.setMonth(data);
    };

    MonthNav = () => {
        return (
            <div className="label-month" onClick={() => this.onChangeMonth()} ref={this.setWrapperRef2}>
                {this.month()}
                <div className="month-popup" ref={this.setWrapperRef3}>
                    {this.state.showMonthPopup && this.months.map((month, index) => {
                        return (
                            <div key={month} className="month-popup-item"
                                onClick={(e) => this.onSelectChange(e, month)}
                            > 
                                    <a href="#" className="month-popup-item-hover">
                                        {month}
                                    </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    onChangeYear = () => {
        this.setState({ showYearPopup: !this.state.showYearPopup });
    }
    setYear = (year) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({ dateContext });
    }
    onChangeYear = () => {
        this.setState({ showYearPopup: !this.state.showYearPopup, showMonthPopup: false });
    }

    setYear = (year) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({ dateContext, selectedYear: moment(dateContext).get('year') });
    };
    onSelectYear = (e, data) => {
        e.preventDefault();
        this.setYear(data);
    };
    YearNav = () => {
        return (
            <div className="label-year" onClick={() => this.onChangeYear()} ref={this.setWrapperRef4}>
                {this.year()}
                <div className="year-popup" ref={this.setWrapperRef5}>
                    {this.state.showYearPopup && this.years.map(year => {
                        return (
                            <div key={year} className="year-popup-item"
                                onClick={(e) => this.onSelectYear(e, year)}
                            >
                                <a href="#" className="year-popup-item-hover">
                                    {year}
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        ); 
    };

    onDayClick = day => {
        this.props.departureSelectedDate(day, this.state.selectedMonth, this.state.selectedYear);
        this.props.departureCalendarDisplay(false);
    };    

    setWrapperRefDepart(node) {
        this.props.departureCalendarNode(node);
    }
    
    setWrapperRef2 = node => {
        this.wrapperRef2 = node;
    }

    setWrapperRef3 = node => {
        this.wrapperRef3 = node;
    }

    setWrapperRef4 = node => {
        this.wrapperRef4 = node;
    }

    setWrapperRef5 = node => {
        this.wrapperRef5 = node;
    }

    handleClickOutside = event => {
        if(this.wrapperRef2 && !this.wrapperRef2.contains(event.target)) {
            if(this.wrapperRef4 && !this.wrapperRef4.contains(event.target)) {
                if(this.wrapperRef3 && !this.wrapperRef3.contains(event.target))
                    this.setState({ showMonthPopup: false });
                if(this.wrapperRef5 && !this.wrapperRef5.contains(event.target))
                    this.setState({ showYearPopup: false });
            };
        };
    };

    render() {
        const blanks = [];
        for(let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <td className="emptySlot" key={i*10}>
                    {""}
                </td>
            );
        };

        const daysInMonth = [];
        for(let d = 1; d <= this.daysInMonth(); d++) {
            let className = (d == this.currentDay() && 
                this.state.selectedMonth === moment().month() && this.state.selectedYear === moment().year()
                ? "day current-day" : "day");
            daysInMonth.push(
                <td key={d} className={className} onClick={() => this.onDayClick(d)}>
                    <span>{d}</span>
                </td>
            );
        };

        const totalSlots = [... blanks, ...daysInMonth];
        const rows = [];
        let cells = [];
        totalSlots.forEach((row, i) => {
            if((i % 7) !== 0) {
                cells.push(row);
            } else {
                const insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if(i === totalSlots.length - 1) {
                const insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        const trElems = rows.map((d, i) => {
            return <tr key={i}>{d}</tr>;
        });

        return (
            <div className={`calendarDepart ${this.props.departureCalendar ? '' : 'calendarDepart-hidden'}`} 
                style={this.style} ref={this.setWrapperRefDepart}
            >
                <div className="calendar-header">
                                <ion-icon name="arrow-round-back"
                                    onClick={this.prevMonth}
                                />
                                {this.MonthNav()}
                                {" "}
                                {this.YearNav()}
                                <ion-icon className="calendar-header-arrow_right" name="arrow-round-forward"
                                    onClick={this.nextMonth}
                                />
                </div>
                <table className="calendar-main" > 
                    <thead>
                        <tr className="calendar-main-weekdays">
                            {this.weekdays()}
                        </tr>
                    </thead>
                    <tbody>
                        {trElems}
                    </tbody>
                </table>
            </div>
        );
    };
};

const mapStateToProp = state => {
    return { departureCalendar: state.displayCalendars.departureCalendar };
}

export default connect(mapStateToProp, { 
    departureSelectedDate, departureCalendarNode, departureCalendarDisplay
})(calendarDeparture);