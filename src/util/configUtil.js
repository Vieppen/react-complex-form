import { STORAGE_EXCLUDES } from './storageUtil'

export async function getConfig(configType, name, src) {

    if (configType === "public")
        return getPublicConfigData(name)

    else if (configType === "fetch")
        return fetchConfigData(src)

    throw new Error(`Invalid configType: ${configType}`)
}

async function fetchConfigData(src) {
    let response = await fetch(src)
    let config = await response.json().catch(e => { throw `${src} could not be read.` })
    return config
}

async function getPublicConfigData(formName) {
    let response = await fetch(`${process.env.PUBLIC_URL}/FormManager/${formName}.json`)
    let config = await response.json().catch(e => { throw `${formName}.json could not be read.` })
    return config
}


export function getEmptyFormValue(formConfig) {
    let tempValue = {}

    for (let fieldName in formConfig.content) {

        if (STORAGE_EXCLUDES.includes(formConfig.content[fieldName].type))
            continue

        let defaultValue = "";

        // Get a default value if it exists
        if (formConfig.content[fieldName]?.default !== undefined)
            defaultValue = formConfig.content[fieldName].default;

        tempValue[fieldName] = defaultValue;
    }

    return tempValue;
}