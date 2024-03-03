import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './figures.components.scss'
import xml2js from 'xml2js';
import fs from 'fs';

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

import {Line} from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend    
);

export function Figure(){

    const data: any = {
        labels: [1, 2, 3],
        datasets: [
            {
                label: "Время, с",
                data: [1, 13, 44],
                borderColor: "black",
                backgroundColor: 'black',
                tension: 0.4
            }
        ]
    }

    const options: any = {
        
    };

    return (
        <div className = 'figure'>
            <h1>hi, bro</h1>
            <Line
            data = {data} 
            options = {options}
            ></Line>
            <Button></Button>
        </div>
    )
}

function Button(){

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        const link = file.path;
        let reader = new FileReader();
        reader.readAsDataURL(link);
        // console.log(test);
        // Weight(link);
    }

    return (
        <div>
            <input onChange = {handleFileChange} className = 'openFigure' name = 'openFigure' type="file" />
        </div>
    )
}

async function Weight(link: string){

    // fs.readFile(link, async (err: any, data: any) => {
//         if(err) throw new Error(err);

//         const parser = new xml2js.Parser();

//         const parserData: any = await parser.parseStringPromise(data)
//             console.log(parserData)
            // .then((res: any) => {
            //     // console.log(res);
            //     let weight = [];
            //     let time = [];
            //     // console.log(res.DATAPACKET.ROWDATA[0].ROW[0])
            //     for(let elem of res.DATAPACKET.ROWDATA[0].ROW){
            //         weight.push(elem.$.OSWES);
            //     }
            //     for(let i: number = 0; i < weight.length; i++){
            //         time.push(i)
            //     }
            //     console.log(weight.length)
            //     console.log(time.length)
            // })
            // .catch((err) => {
            //     console.log(err)
            // })
        // })
}