import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import ReactDOM from 'react-dom';
import './figures.components.scss'
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

function Figure(props: any){

    const data: any = {
        labels: props.time,
        datasets: [
            {
                label: "Время, с",
                data: props.weight,
                borderColor: "#467996",
                // backgroundColor: '#467996',
                tension: 0.4
            }
        ]
    }

    const options: any = {
        title: {
            display: true,
            text: "График проездов"
        }
    };

    return (
        <div className = 'figure'>
            <Line
            options = {{
                elements: {
                    line: {
                        tension: 0.1,
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
                }
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
            link: link
        })
        const ress: any = await res;
        setWeight(ress.data.weight)
        setTime(ress.data.time)
        console.log(typeof ress.data.weight)
        console.log(typeof ress.data.time)
    }

    useEffect(() => {
        console.log(resultAxios()) 
    }, [link])

    return (
        <div>
            <h1 className = 'title'>График проездов</h1>
            <input onChange = {handleFileChange} className = 'openFigure' name = 'openFigure' type="file" />
            <Figure weight = {weight} time = {time} />
            {/* <Figure  /> */}
        </div>
    )
}
