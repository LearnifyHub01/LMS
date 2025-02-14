import { Document,Model } from "mongoose";
interface MonthData{
    month:string,
    count:string
}

export async function generateLast12MonthsData<T extends Document>(
    model:Model<T>
):Promise<{last12Months:MonthData[]}>{
    const last12MonthsData:MonthData[]=[]
    const currentDate=new Date()
    currentDate.setDate(currentDate.getDate()+1)

    for(let i = 11 ; i>=0;i--){
        const endDate=new Date(currentDate.getFullYear(),currentDate.getMonth())
    }

}