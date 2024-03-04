import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js'

export default async function weight (link: string) {
    return new Promise( async (res: any) => {
        const fileRead = fs.readFileSync(link);
        const parser = new xml2js.Parser();
        const fileParse = await parser.parseStringPromise(fileRead)

        let weight: any[] = [];
        let time: any[] = [];
        for(let elem of fileParse.DATAPACKET.ROWDATA[0].ROW){
            weight.push(elem.$.OSWES);
        }
        for(let i = 0; i < weight.length; i++){
            time.push(i)
        }

        console.log(weight)
        console.log(time)

        res({
            weight: weight,
            time: time
        })
    })
    
}