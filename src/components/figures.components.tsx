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


// ChartJS.register(Zoom);

function Figure(props: any){

    const data: any = {
        title: {
            display: true,
            text: 'Вес'
        },
        labels: props.time,
        datasets: [
            {
                label: "Время, с",
                data: props.weight,
                borderColor: "#467996",
                tension: 0.01,
                pointRadius: 0.01
            }
        ]
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
    const sensor: string[] = ['OSWES', 'WES12', 'WES34', 'WES56', 'WES78', 'WES910', 'WES1112']
    const [link, setLink] = useState(0);
    const [weight, setWeight] = useState(0);
    const [time, setTime] = useState(0);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        const fileLink = file.path;
        setLink(fileLink);
    }

    const axiosConfigAsync = async (data: any) => {
        return await axios({
            method: "post",
            url: "http://localhost:3002/",
            headers: {},
            data: data
        })
    } 

    const resultAxios = async() => {
        const res: any = axiosConfigAsync({
            link: link,
            sensor: sensor[2]
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
            <Inputs />
            <div style = {{width: "100%", height: "100%"}}>
                <Figure weight = {weight} time = {time} />
            </div>
            {/* <Figure  /> */}
        </div>
    )
}

function Input(props: any){
    const style: any = {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        gap: "10px"
    }
    return(
        <label style = {style} htmlFor="">
            <input value = {props.value} id = {props.id} type = 'checkbox' /> {props.children}
        </label> 
    )
}

function Inputs(){
    const style: any = {
        display: 'flex',
        justifyContent: "center",
        gap: '10px 40px',
        flexWrap: "wrap",
        fontFamily: "Arial, Helvetica, sans-serif"
    } 
    return (
        <div style = {style}>
            <Input value = "all" id = "all">Вес</Input>
            <Input value = "12" id = '12'>Вес 1-2</Input>
            <Input value = "34" id = '34'>Вес 3-4</Input>
            <Input value = "56" id = '56'>Вес 5-6</Input>
            <Input value = "78" id = '78'>Вес 7-8</Input>
            <Input value = "910" id = '910'>Вес 9-10</Input>
            <Input value = "1112" id = '1112'>Вес 11-12</Input>
        </div>
    )
}
