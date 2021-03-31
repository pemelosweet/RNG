import React, { Component } from 'react'
export default class todo extends Component {
    constructor(props) {
        super(props)
        this.gg = React.createRef()
        this.c1 = React.createRef()
        this.state = {
            todoArr: ['睡觉', '吃饭']
            // todoArr:[{name:'睡觉',id:'001',done:true},{name:'吃饭',id:'002',done:true}]
        }
    }
    addArr(e) {
        var theEvent = window.event || e;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code === 13) {
            this.setState({
                todoArr: [this.gg.current.value, ...this.state.todoArr]
            })
            this.gg.current.value = ''
        }

    }
    mouse(e) {
        if (this.state.todoArr.indexOf(e.target.innerText) !== '-1') {
            console.log(e.target.innerText);
        }
    }
    change() {
        var loves = document.getElementsByName("love");
        console.log(loves);
        if (this.c1.current.checked === false) {
            for (var i = 0; i < loves.length; i++) {
                loves[i].checked = false;
            }
        } else {
            for (var it = 0; it < loves.length; it++) {
                loves[it].checked = true;
            }
        }
    }
    render() {
        return (
            <div>
                <input ref={this.gg} onKeyUp={(e) => { this.addArr(e) }} type="text" />
                <ul      >
                    {this.state.todoArr.map((el, es) => {
                        return (
                            <li onMouseEnter={(e) => { this.mouse(e) }} key={es}>
                                <input name="love" type="checkbox" />
                                <span>{el}</span>
                                <button>删除</button>
                            </li>
                        )

                    })}
                </ul>
                <input ref={this.c1} onClick={() => { this.change() }} type="checkbox" />已完成/全部{this.state.todoArr.length}
            </div>
        )
    }
}
