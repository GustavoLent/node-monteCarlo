const rand = (seed, a, c, M) => {
    const val = ((a * seed) + c) % M
    return val;
}

const randomValues = ({ seed, amount, a, c, M }) => {
    const values = [seed]

    for (let i = 1; i < amount; i++) {
        const nextSeed = values[i - 1]
        const res = rand(nextSeed, a, c, M)

        values.push(res)
    }

    return values.map(v => v / M);
}

module.exports = {
    rand,
    randomValues
}
