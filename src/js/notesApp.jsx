var OBJ = [
    {
        id:1,
        text: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
        color: "#FFD700"
    },
    {
        id:2,
        text:  "Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.",
        color: "#20B2AA"
    },
    {
        id:3,
        text: "Lorem ipsum dolor sit amet.",
        color: "#87CEFA"
    },
    {
        id:4,
        text: "Lorem ipsum dolor sitipsum dolor sit. Lorem ipsum  amet.",
        color: "red"
    },
];

var Note = React.createClass({//окрема заміка
    render:function () {
        var styl = {backgroundColor:this.props.color};
        return (
            <div className="note" style={styl}>
                {
                    this.props.children
                }
            </div>
        );
    }
});

var NoteEditor = React.createClass({ //textarea для заміток
    getInitialState:function () {
      return {
          text:"",
          color:""
      };
    },

    handleTextChange:function (e) {             // metod obnovlaje stan polja text
        this.setState({text:e.target.value});
        console.log(e.target.value);
    },

    handleNoteAdd:function () {                 // метод створення нової замітки
        var newNote = {
            text: this.state.text,
            color:this.state.color,
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);
        this.setState({ text: '' });
    },

    setColorNoteRed:function () {

       return this.setState({ color: 'red' });
    },
    setColorNoteBlueviolet:function () {

        return this.setState({ color: 'blueviolet' });
    },
    setColorNoteYellow:function () {

        return this.setState({ color: 'yellow' });
    },

    render:function () {
        return(
            <div className="note-editor">
                <textarea name="name"
                          rows={5}
                          placeholder="тут писати замітки"
                          className="textarea"
                          value={this.state.text}
                          onChange={this.handleTextChange}
                >
                </textarea>
                <button className="button_color1" onClick={this.setColorNoteRed}></button>
                <button className="button_color2" onClick={this.setColorNoteBlueviolet}></button>
                <button className="button_color3" onClick={this.setColorNoteYellow}></button>
                <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
                {/*тут на клік викликаємо handleNoteAdd та передаємо новий обєт*/}
            </div>
        );
    }
});

var NotesGrid = React.createClass({ // усі замітки

    componentDidMount: function() {
        var grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    },

    componentDidUpdate: function(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    render:function () {
        return(
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(function (note) {
                        return (
                            <Note key={note.id}
                                  color = {note.color}>{note.text}
                            </Note>
                        );
                    })
                }
            </div>
        );
    }
});
var NotesApp = React.createClass({                  //загальне вікно
    getInitialState:function () {
        return {
            notes:OBJ
        }
    },


    handleNoteAdd:function (newNote) {              // функція створення нової замітки
        var newNotes = this.state.notes.slice();    //створює копію масиву notes
        newNotes.unshift(newNote);                  // передає на початок масиву прийнятий обєкт
        OBJ=newNotes;
        this.setState({notes:OBJ});            //і перевизиває новий масив
    },

    noteSearch:function (e) {
        var searchQuery = e.target.value.toLowerCase();
        var tempMassSelectedetNotes = OBJ.filter(function (el) {
            var tempQuery = el.text.toLowerCase();
            return tempQuery.indexOf(searchQuery) !==-1;
        });

        this.setState({notes:tempMassSelectedetNotes});
        console.log(tempMassSelectedetNotes);
    },

    render:function () {
        return(
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <input className="input" type="text" onChange={this.noteSearch}/>
                <NoteEditor onNoteAdd = {this.handleNoteAdd} />
                <NotesGrid notes = {this.state.notes} />
            </div>
        );
    }
});

ReactDOM .render(
    <NotesApp />,document.getElementById("mainContent")
);