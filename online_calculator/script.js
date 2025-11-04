function convertUnits() {
    const fishLength = parseFloat(document.getElementById('fishLength').value);
    const maxLoss = parseFloat(document.getElementById('maxLoss').value);
    const entryLoss = parseFloat(document.getElementById('entryLoss').value);
    const maxTurb = parseFloat(document.getElementById('maxTurb').value);
    const minDepth = parseFloat(document.getElementById('minDepth').value);
    const minWidth = parseFloat(document.getElementById('minWidth').value);
    
    // Maximum Water Level Differential Component

    let diffTransferFunctionFishSize = new Array(0,50,100,200,700,1500);
    let diffTransferFunctionFullFxn = new Array(85, 110, 140, 160, 170, 170)
    let diffTransferFunctionNoFxn = new Array(120, 150, 175, 200, 240, 240)
    nDiffTransferFunction = diffTransferFunctionFishSize.length;

    let diffInterpFullFxn = 0.0;
    let diffInterpNoFxn = 0.0;
    let diffFxn = 0.0;

    if(fishLength<diffTransferFunctionFishSize[0]){
        diffInterpFullFxn = diffTransferFunctionFullFxn[0]
        diffInterpNoFxn = diffTransferFunctionNoFxn[0]
    } else if(fishLength>=diffTransferFunctionFishSize[nDiffTransferFunction-1]){
        diffInterpFullFxn = diffTransferFunctionFullFxn[nDiffTransferFunction-1]
        diffInterpNoFxn = diffTransferFunctionNoFxn[nDiffTransferFunction-1]
    } else{
        for (let i = 0; i < diffTransferFunctionFishSize.length-1; i++) {
            if(fishLength>=diffTransferFunctionFishSize[i] & fishLength<diffTransferFunctionFishSize[i+1]){
                prop = (fishLength - diffTransferFunctionFishSize[i])/(diffTransferFunctionFishSize[i+1]-diffTransferFunctionFishSize[i])
                diffInterpFullFxn = diffTransferFunctionFullFxn[i] + prop*(diffTransferFunctionFullFxn[i+1]-diffTransferFunctionFullFxn[i])
                diffInterpNoFxn = diffTransferFunctionNoFxn[i] + prop*(diffTransferFunctionNoFxn[i+1]-diffTransferFunctionNoFxn[i])
            }
        }
    }
    
    if(maxLoss<diffInterpFullFxn){
        diffFxn = 1.0;
    } else if(maxLoss>diffInterpNoFxn){
        diffFxn = 0.0;
    }else{
        diffFxn = (diffInterpNoFxn - maxLoss) / (diffInterpNoFxn-diffInterpFullFxn)
    }

    document.getElementById('maxLossResult').textContent = diffFxn;


    //if (isNaN(inputValue)) {
    //    document.getElementById('resultValue').textContent = "Invalid input";
    //    return;
    //}

    // Convert to a base unit (meters in this case) first
    //let valueInMeters;
    //if (fromUnit === 'meters') {
    //    valueInMeters = inputValue;
    //} else if (fromUnit === 'feet') {
    //    valueInMeters = inputValue * 0.3048; // 1 foot = 0.3048 meters
    //} else if (fromUnit === 'inches') {
    //    valueInMeters = inputValue * 0.0254; // 1 inch = 0.0254 meters
    //}

    // Convert from the base unit to the target unit
    //if (toUnit === 'meters') {
    //    result = valueInMeters;
    //} else if (toUnit === 'feet') {
    //    result = valueInMeters / 0.3048;
    //} else if (toUnit === 'inches') {
    //    result = valueInMeters / 0.0254;
    //}

    //document.getElementById('resultValue').textContent = result.toFixed(2) + " " + toUnit;
    document.getElementById('resultValue').textContent = "TEst" + fishLength + maxLoss;
}