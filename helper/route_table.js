const { readdir } = require("node:fs/promises")

async function routeTable() {
    let routeTable = {}
    try {
        const files = await readdir(`${process.cwd()}/route`)
        for(const parent of files) {
            const files = await readdir(`${process.cwd()}/route/${parent}`)
            for(const file of files)
                routeTable[parent] = (routeTable[parent] || []).concat(file.replace(new RegExp(`(^${parent}_)|(_)`, "g"), "/"))
        }
    } catch(err) {
        throw new Error(err);
    }

    return routeTable
}

module.exports = routeTable