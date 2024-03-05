import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import ReactDOM from 'react-dom';
import './figures.components.scss'
// import Zoom from 'chartjs-plugin-zoom';
import 'chartjs-plugin-zoom';
// import Form from 'react-bootstrap/Form';


import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

import {Line, Chart} from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend    
);

const datasets = (weight: any) => {
    const data: any = [];

    for(let i = 0; i < weight.length; i++){
        if(sensors[i].open == true){
            data.push({
                label: sensors[i].title,
                data: weight[i],
                borderColor: sensors[i].color,
                // backgroundColor: sensors[i].color,
                tension: 0.01,
                pointRadius: 0.01 
            })
        }
        
    }

    return data;
}

const sensors = [
    {
        name: "OSWES",
        title: "Вес по осям",
        open: true,
        color: "#467996"
    },
    {
        name: "WES12",
        title: "Вес 1-2",
        open: true,
        color: "#8B0000"
    },
    {
        name: "WES34",
        title: "Вес 3-4",
        open: true,
        color: "#32CD32"
    },
    {
        name: "WES56",
        title: "Вес 5-6",
        open: true,
        color: "#008080"
    },
    {
        name: "WES78",
        title: "Вес 7-8",
        open: true,
        color: "#BA55D3"
    },
    {
        name: "WES910",
        title: "Вес 9-10",
        open: true,
        color: "#4B0082"
    },
    {
        name: "WES1112",
        title: "Вес 11-12",
        open: true,
        color: "#000080"
    },
]

// ChartJS.register(Zoom);

function Figure(props: any){

    const data = {
        title: {
            display: true,
            text: 'Вес'
        },
        labels: props.time,
        datasets: datasets(props.weight) 
    }


    return (
        <div className = 'figure'>
            <Line
            options = {{
                elements: {
                    line: {
                        tension: 0.01,
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: "Вес, кг"
                        },
                        beginAtZero: true,
                        suggestedMin: 5,
                        suggestedMax: 50     
                    },
                    x: {
                        title: {
                            display: true,
                            text: "Время, c"
                        },
                        suggestedMin: Date.now() - 1000 * 60 * 60 * 24 * 30,
                        suggestedMax: Date.now(),
                    },
                },
            }}
            data = {data} 
            ></Line>
        </div>
    )
}

export function Figures(){
    const [link, setLink] = useState(0);
    const [weight, setWeight] = useState(0);
    const [time, setTime] = useState(0);

    const [test, setTest] = useState(sensors); //test

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        const fileLink = file.path;
        setLink(fileLink);
    }

    const axiosConfigAsync = async (data: any) => {
        return await axios({
            method: "post",
            url: "http://localhost:3002/all",
            headers: {},
            data: data
        })
    } 

    const resultAxios = async() => {
        const res: any = axiosConfigAsync({
            link: link,
            sensors: sensors.map((elem: any) => elem.name)
        })
        const ress: any = await res;
        setWeight(ress.data.weight)
        setTime(ress.data.time)
    }

    useEffect(() => {
        resultAxios() 
    }, [link])

    const style: any = {
        display: 'flex',
        flexDirection: "column",
        gap: "20px"         
    }

    return (
        <div style = {style}>
            <h1 className = 'title'>График проездов</h1>
            <input onChange = {handleFileChange} className = 'openFigure' name = 'openFigure' type="file" />
            {/* <Inputs test = {test} setTest = {setTest}/> */}
            <div style = {{width: "100%", height: "100%"}}>
                <Figure test = {test} weight = {weight} time = {time} />
            </div>
        </div>
    )
}

function Input(props: any){
    const [click, setClick] = useState(false);

    const style: any = {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        gap: "5px"
    }

    const handleClick = () => {
        if(click == false){
            setClick(true);
            props.test.map((elem: any) => {
                if(props.id == elem.name){
                    elem.open = true;
                    props.setTest(props.test)
                    // console.log(props.test)
                }
            })
        }
        else{
            setClick(false);
            props.test.map((elem: any) => {
                if(props.id == elem.name){
                    elem.open = false;
                    props.setTest(props.test)
                    // console.log(props.test)
                }
            })
        }
    }

    return(
        <label style = {style} htmlFor="">
            <input onClick={handleClick} id = {props.id} type = 'checkbox' /> <small>{props.children}</small>
            <small>{`${click}`}</small>
        </label> 
    )
}

function Inputs(props: any){


    const style: any = {
        display: 'flex',
        justifyContent: "center",
        gap: '10px 40px',
        flexWrap: "wrap",
        fontFamily: "Arial, Helvetica, sans-serif"
    } 

    const text = ['Вес по осям', 'Вес 1-2', 'Вес 3-4', 'Вес 5-6', 'Вес 7-8', 'Вес 9-10', 'Вес 11-12']

    return (
        <div style = {style}>
            {text.map((elem: any, i: number) => <Input test = {props.test} setTest = {props.setTest} id = {sensors[i].name}>{elem}</Input>)}
        </div>
    )
}
