var Timer = React.createClass({
    getInitialState: function () { //початкова ініціалізація секунд
        return {
            seconds: 0,
            minutes: 0,
            secondsString: "00",
            minutesString:"00",
            setStartTimer: false
        };
    },

    componentDidMount: function () { //викликає кожної секунди tick
        /*console.log(this.state.setStartTimer);*/
        this.timer = setInterval(this.tick, 1000);
    },

    getToggleTimeStatusClass: function () {
        return this.state.setStartTimer
            ? "glyphicon glyphicon-stop"
            : "glyphicon glyphicon-play";
    },

    tick: function () {                                 // міняє стан
        this.setState(this.setTime(1));
    },

    setTime: function (attr) {
        if (this.state.seconds + attr !== 60){
            this.setState({seconds:this.state.seconds+1});
            return this.setSecondsString;
        }
        else{

            this.setState( {seconds:0,minutes:this.state.minutes+1});
            return this.setMinutesString;
        }

    },

    setSecondsString:function () {
       if(this.state.seconds<10){

         return this.setState({secondsString:( "0"+this.state.seconds)});
       }
       return this.setState({secondsString:this.state.seconds})
    },

    setMinutesString:function () {
        if(this.state.minutes<10){

            return this.setState({minutesString:( "0"+this.state.minutes)});
        }
        return this.setState({minutesString:this.state.minutes})
    },

    componentWillUnmount: function () {
        clearInterval(this.timer);
    },

    startSwitchTimer: function () {

        console.log("startSwitchTimer");
        this.setState({setStartTimer: !this.state.setStartTimer});
        (this.state.setStartTimer === false)
            ?
            (clearInterval(this.timer))
            :
            (this.timer = setInterval(this.tick, 1000));

    },

    resetTimer: function () {

        console.log("resetTimer");
        return this.setState({seconds: 0});

    },

    render: function () {
        return (
            <div>
                <h4> Пройшло {this.state.minutesString}:{this.state.secondsString}  </h4>

                <button onClick={this.startSwitchTimer}>
                    <i className={this.getToggleTimeStatusClass()}></i>
                </button>

                <button onClick={this.resetTimer}>
                    <i className="glyphicon glyphicon-repeat"></i>
                </button>
            </div>
        );
    }
});

ReactDOM.render(
    <Timer />,
    document.getElementById('mainTimer')
);
