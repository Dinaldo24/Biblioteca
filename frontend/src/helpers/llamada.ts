

export const GetallBook =  async (url :  string) =>{
        try {
             let primero = await  fetch( url)  
             console.log( primero)
             let secondo =  await primero.json() 
             return secondo
        } catch (error) {
            
            console.log( error)
        }          


}