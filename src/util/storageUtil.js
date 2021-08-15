
export const STORAGE_EXCLUDES = [
    'header',
    'label',
    'paragraph',
    'submit',
    'button',
    'horizontal-line'
]

export function initiateStorage(formName, storageType, initValues) {
    if (storageType === 'local') {
        if (localStorage.getItem(formName) === null)
            localStorage.setItem(formName, JSON.stringify(initValues))
    } else if (storageType === 'session') {
        if (sessionStorage.getItem(formName) === null)
            sessionStorage.setItem(formName, JSON.stringify(initValues))
    }
    else {
        return initValues
    }

    return getValuesFromStorage(formName, storageType)
}

export function updateStorage(formName, storageType, values) {
    if (storageType === 'local') {
        localStorage.setItem(formName, JSON.stringify(values))
    } else if (storageType === 'session') {
        sessionStorage.setItem(formName, JSON.stringify(values))
    }
}

export function getValuesFromStorage(formName, storageType) {
    let values = {}

    if (storageType === 'local') {
        values = JSON.parse(localStorage.getItem(formName))
    } else if (storageType === 'session') {
        values = JSON.parse(sessionStorage.getItem(formName))
    } else {
        console.warn(`You are trying to retrieve form values for form '${formName}' from ${storageType} storage with the storage type unset or 'none'.`)
    }

    return values
}

export function getFormValues(formName) {
    let localValues = JSON.parse(localStorage.getItem(formName))
    let sessionValues = JSON.parse(sessionStorage.getItem(formName))

    return localValues || sessionValues || {}
}

export function getFormValue(formName, fieldName) {
    return getFormValues(formName)[fieldName] || null
}