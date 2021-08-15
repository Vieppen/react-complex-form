import { STORAGE_EXCLUDES } from './storageUtil'

export async function getConfig(configType, config, name, src) {

    if (configType === 'object')
        return config

    else if (configType === 'public')
        return getPublicConfigData(name)

    else if (configType === 'fetch')
        return fetchConfigData(src)

    throw new Error(`Invalid configType: ${configType}`)
}

async function fetchConfigData(src) {
    let response = await fetch(src)
    return response.json().catch(() => { throw `${src} could not be read.` })
}

async function getPublicConfigData(formName) {
    let response = await fetch(`${process.env.PUBLIC_URL}/FormManager/${formName}.json`)
    return response.json().catch(() => { throw `${formName}.json could not be read.` })
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

export function checkFormValidity(value, { content }) {
    let invalid = []

    for (let field in content) {
        if (!content[field].optional) {
            if (formError(content[field].type, value[field]))
                invalid = [...invalid, field]
        }
    }

    return invalid
}

function formError(type, value) {
    // EMAIL FIELD
    if (type === "email") {
        if (!emailRegex.test(value))
            return true;
        return false;

        // TEXT FIELD
    } else if (['text',
        'textarea',
        'password',
        'tel',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'file',
        'month',
        'number',
        'range',
        'search',
        'time',
        'week'].includes(type)) {
        if (!value)
            return true;
        return false;
    }
}