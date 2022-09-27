const buildChart = require("./utils/buildChart.js");
const generateRandom = require("./utils/generateRandom.js");

(async () => {
    const chartWidth = 400;
    const chartHeight = 400;

    const multiplier = Math.pow(10, 3)
    const base = 100

    const param = {
        "seed": 31,
        "amount": base * multiplier,
        "a": 5039,
        "c": 0,
        "M": 2147483647
    }

    const functions = [
        {
            "id": "PI",
            "isUnderGraph": (x, y) => (Math.pow(x, 2) + Math.pow(y, 2)) <= 1,
            "print": (underGraphCount, total) => {
                const pi = 4 * (underGraphCount / total)
                console.log(`PI: ${pi}`)
            }
        },
        {
            "id": "sen(x) cosh(x)",
            "isUnderGraph": (x, y) => {
                const calculatedY = Math.sin(x) * Math.cosh(x)

                return y < calculatedY
            },
            "print": (underGraphCount, total) => {
                console.log(`Area: ${underGraphCount / total}`)
            }
        },
        {
            "id": "sen(x) senh(x)",
            "isUnderGraph": (x, y) => {
                const calculatedY = Math.sin(x) * Math.sinh(x)

                return y < calculatedY
            },
            "print": (underGraphCount, total) => {
                console.log(`Area: ${underGraphCount / total}`)
            }
        },
        {
            "id": "x²",
            "isUnderGraph": (x, y) => {
                const calculatedY = x * x

                return y < calculatedY
            },
            "print": (underGraphCount, total) => {
                console.log(`Area: ${underGraphCount / total}`)
            }
        }
    ]

    try {
        const { Xs, Ys } = generateRandom({ ...param })
        console.log("Ended the creation of random values")

        for (let funcIDX = 0; funcIDX < functions.length; funcIDX++) {
            const func = functions[funcIDX];
            console.log(`Running function ${func.id}`)

            const colors = []
            let underGraphCount = 0;
            const total = Xs.length;

            for (let i = 0; i < Xs.length; i++) {
                const x = Xs[i];
                const y = Ys[i];

                if (func.isUnderGraph(x, y)) {
                    colors.push('rgb(51, 204, 204)')
                    underGraphCount++
                } else {
                    colors.push('rgb(124, 102, 204)')
                }
            }

            await buildChart({ Xs, Ys, filename: `results/${func.id}`, colors, width: chartWidth, height: chartHeight });
            func.print(underGraphCount, total)
        }

    } catch (error) {
        console.log(error)
    }

})()

