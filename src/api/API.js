export function checkStatus(s) {
    const arr = [200, 201, 304, 400, 401, 403, 404]
    return arr.some((el) => {
        return el === s
    })
}

const content = (res) => {
    return res.headers.get('content-type')
}

const processResponse = (res) => {
    if (checkStatus(res.status)) {
        if (content(res) !== null) return res.json()
        else return {}
    } else return { status: 'error', message: 'Błąd serwera...' }
}

const handleResponse = (res) => {
    const { status, lenght, data, message } = res
    const response = {
        status,
        lenght,
        data,
        message,
    }
    return response
}

const handleError = (err) => {
    return { status: 'error', message: `Błąd aplikacji: ${err}` }
}

function getHeaders() {
    return {
        'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer Token`,
    }
}

function getDefaultOptions() {
    return {
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'strict-origin-when-cross-origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }
}

function getParams(queryParams = {}) {
    let queryString = Object.keys(queryParams)
        .map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key])
        })
        .join('&')
    if (queryString) queryString = `?${queryString}`
    return queryString
}

function makeRequest(url, body_query) {
    const headers = getHeaders()
    const option = getDefaultOptions()
    const init = { ...option, ...{ headers }, ...body_query } //Object.assign({}, option, { headers }, body_query)
    const response = fetch(url, {
        ...init,
    })
        .then((res) => processResponse(res))
        .then((res) => handleResponse(res))
        .catch((err) => handleError(err))
    return response
}

export const API = {
    makeGet: function (url, queryParams) {
        const getData = {
            method: 'GET',
            query: getParams(queryParams),
        }
        const response = makeRequest(url, getData)
        return response
    },

    makePost: function (url, data) {
        const postData = {
            method: 'POST',
            body: JSON.stringify(data),
        }
        const response = makeRequest(url, postData)
        return response
    },

    makePut: function (url, data) {
        const putData = {
            method: 'PUT',
            body: JSON.stringify(data),
        }
        const response = makeRequest(url, putData)
        return response
    },

    makePatch: function (url, data) {
        const putData = {
            method: 'PATCH',
            body: JSON.stringify(data),
        }
        const response = makeRequest(url, putData)
        return response
    },

    makeDelete: function (url, queryParams) {
        const deleteData = {
            method: 'DELETE',
            query: getParams(queryParams),
        }
        const response = makeRequest(url, deleteData)
        return response
    },
}
