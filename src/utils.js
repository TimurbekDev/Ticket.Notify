export function processResponseJs(response) {
    
    const trains = response[0]?.trains || [];
    let allFreeSeats = 0;
    

    trains.forEach((trainObj) => {
        const train = trainObj.train || [];
        
        train.forEach((trainDetails) => {
            const cars = trainDetails.places?.cars || [];            
            cars.forEach((car) => {                
                allFreeSeats += parseInt(car.freeSeats, 10) || 0; // Add freeSeats count
            });
        });
    });

    return allFreeSeats

}