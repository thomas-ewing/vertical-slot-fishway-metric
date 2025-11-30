function convertUnits() {
    const fishLength = parseFloat(document.getElementById('fishLength').value);
    const maxLoss = parseFloat(document.getElementById('maxLoss').value);
    const maxTurb = parseFloat(document.getElementById('maxTurb').value);
    const entryVelocity = parseFloat(document.getElementById('entryVelocity').value);
    const minDepth = parseFloat(document.getElementById('minDepth').value);
    const minWidth = parseFloat(document.getElementById('minWidth').value);
    
    // Maximum Water Level Differential Component

    let diffTransferFunctionFishSize = new Array(20,50,100,200,400,700,1500);
    let diffTransferFunctionFullFxn = new Array(85, 110, 140, 160, 180, 200, 200)
    let diffTransferFunctionNoFxn = new Array(120, 150, 200, 250, 320, 350, 350)
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
        for (let i = 0; i < nDiffTransferFunction-1; i++) {
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

    document.getElementById('maxLossResult').textContent = diffFxn.toFixed(2);

    // Maximum TDR Component

    let turbTransferFunctionFishSize = new Array(20,50,100,200,700,1500);
    let turbTransferFunctionFullFxn = new Array(10, 45, 70, 95, 110, 110)
    let turbTransferFunctionNoFxn = new Array(30, 65, 90, 115, 150, 150)
    nTurbTransferFunction = turbTransferFunctionFishSize.length;

    let turbInterpFullFxn = 0.0;
    let turbInterpNoFxn = 0.0;
    let turbFxn = 0.0;

    if(fishLength<turbTransferFunctionFishSize[0]){
        turbInterpFullFxn = turbTransferFunctionFullFxn[0]
        turbInterpNoFxn = turbTransferFunctionNoFxn[0]
    } else if(fishLength>=turbTransferFunctionFishSize[nTurbTransferFunction-1]){
        turbInterpFullFxn = turbTransferFunctionFullFxn[nTurbTransferFunction-1]
        turbInterpNoFxn = turbTransferFunctionNoFxn[nTurbTransferFunction-1]
    } else{
        for (let i = 0; i < nTurbTransferFunction-1; i++) {
            if(fishLength>=turbTransferFunctionFishSize[i] & fishLength<turbTransferFunctionFishSize[i+1]){
                prop = (fishLength - turbTransferFunctionFishSize[i])/(turbTransferFunctionFishSize[i+1]-diffTransferFunctionFishSize[i])
                turbInterpFullFxn = turbTransferFunctionFullFxn[i] + prop*(turbTransferFunctionFullFxn[i+1]-turbTransferFunctionFullFxn[i])
                turbInterpNoFxn = turbTransferFunctionNoFxn[i] + prop*(turbTransferFunctionNoFxn[i+1]-turbTransferFunctionNoFxn[i])
            }
        }
    }

   if(maxTurb<turbInterpFullFxn){
        turbFxn = 1.0;
    } else if(maxTurb>turbInterpNoFxn){
        turbFxn = 0.0;
    }else{
        turbFxn = (turbInterpNoFxn - maxTurb) / (turbInterpNoFxn-turbInterpFullFxn)
    }

    document.getElementById('maxTurbResult').textContent = turbFxn.toFixed(2);

    // Entry Velocity

    let entryVelocityInterpFullFxn = 1.0;
    let entryVelocityInterpNoFxn = 0.3;
    let entryVelocityFxn = 0.0;


    if(entryVelocity>=entryVelocityInterpFullFxn){
        entryVelocityFxn = 1.0;
    } else if(entryVelocity<=entryVelocityInterpNoFxn){
        entryVelocityFxn = 0.0;
    }else{
        entryVelocityFxn = (entryVelocity - entryVelocityInterpNoFxn) / (entryVelocityInterpFullFxn-entryVelocityInterpNoFxn)
    }

    document.getElementById('entryVelocityResult').textContent = entryVelocityFxn.toFixed(2);

    // Minimum Depth

    let depthTransferFunctionFishSize = new Array(20,50,100,200,700,1500);
    let depthTransferFunctionFullFxn = new Array(0.3,0.3,0.3,0.3,0.4,0.7,1.5)
    let depthTransferFunctionNoFxn = new Array(0.2,0.2,0.2,0.2,0.2,0.35,0.75)
    nDepthTransferFunction = depthTransferFunctionFishSize.length;

    let depthInterpFullFxn = 0.0;
    let depthInterpNoFxn = 0.0;
    let depthFxn = 0.0;

    if(fishLength<depthTransferFunctionFishSize[0]){
        depthInterpFullFxn = depthTransferFunctionFullFxn[0]
        depthInterpNoFxn = depthTransferFunctionNoFxn[0]
    } else if(fishLength>=depthTransferFunctionFishSize[nDepthTransferFunction-1]){
        depthInterpFullFxn = depthTransferFunctionFullFxn[nDepthTransferFunction-1]
        depthInterpNoFxn = depthTransferFunctionNoFxn[nDepthTransferFunction-1]
    } else{
        for (let i = 0; i < nDepthTransferFunction-1; i++) {
            if(fishLength>=depthTransferFunctionFishSize[i] & fishLength<depthTransferFunctionFishSize[i+1]){
                prop = (fishLength - depthTransferFunctionFishSize[i])/(depthTransferFunctionFishSize[i+1]-depthTransferFunctionFishSize[i])
                depthInterpFullFxn = depthTransferFunctionFullFxn[i] + prop*(depthTransferFunctionFullFxn[i+1]-depthTransferFunctionFullFxn[i])
                depthInterpNoFxn = depthTransferFunctionNoFxn[i] + prop*(depthTransferFunctionNoFxn[i+1]-depthTransferFunctionNoFxn[i])
            }
        }
    }

   if(minDepth<depthInterpNoFxn){
        depthFxn = 0.0;
    } else if(minDepth>depthInterpFullFxn){
        depthFxn = 1.0;
    }else{
        depthFxn = (depthInterpNoFxn - minDepth) / (depthInterpNoFxn-depthInterpFullFxn)
    }

    document.getElementById('minDepthResult').textContent = depthFxn.toFixed(2);

    // Minimum Slot Width

    let widthTransferFunctionFishSize = new Array(20,50,100,200,700,1500);
    let widthTransferFunctionFullFxn = new Array(4, 20, 40, 140, 300)
    let widthTransferFunctionNoFxn = new Array(3.2, 16, 32, 112, 240)
    nWidthTransferFunction = widthTransferFunctionFishSize.length;

    let widthInterpFullFxn = 0.0;
    let widthInterpNoFxn = 0.0;
    let widthFxn = 0.0;

    if(fishLength<widthTransferFunctionFishSize[0]){
        widthInterpFullFxn = widthTransferFunctionFullFxn[0]
        widthInterpNoFxn = widthTransferFunctionNoFxn[0]
    } else if(fishLength>=widthTransferFunctionFishSize[nWidthTransferFunction-1]){
        widthInterpFullFxn = widthTransferFunctionFullFxn[nWidthTransferFunction-1]
        widthInterpNoFxn = widthTransferFunctionNoFxn[nWidthTransferFunction-1]
    } else{
        for (let i = 0; i < nWidthTransferFunction-1; i++) {
            if(fishLength>=widthTransferFunctionFishSize[i] & fishLength<widthTransferFunctionFishSize[i+1]){
                prop = (fishLength - widthTransferFunctionFishSize[i])/(widthTransferFunctionFishSize[i+1]-widthTransferFunctionFishSize[i])
                widthInterpFullFxn = widthTransferFunctionFullFxn[i] + prop*(widthTransferFunctionFullFxn[i+1]-widthTransferFunctionFullFxn[i])
                widthInterpNoFxn = widthTransferFunctionNoFxn[i] + prop*(widthTransferFunctionNoFxn[i+1]-widthTransferFunctionNoFxn[i])
            }
        }
    }

    console.log(widthInterpFullFxn)
    console.log(widthInterpNoFxn)

   if(minWidth<widthInterpNoFxn){
        widthFxn = 0.0;
    } else if(minWidth>widthInterpFullFxn){
        widthFxn = 1.0;
    }else{
        widthFxn = (widthInterpNoFxn - minWidth) / (widthInterpNoFxn-widthInterpFullFxn)
    }

    document.getElementById('minWidthResult').textContent = widthFxn.toFixed(2);

    // Master Metric Calculation

    final_metrc = Math.min(diffFxn, turbFxn) * Math.min(widthFxn, depthFxn) * entryVelocityFxn
    document.getElementById('metricResult').textContent = final_metrc.toFixed(2);


}