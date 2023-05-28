export const is = {
    notEqual: (ref, val = 'hidden', message = 'Wybierz z listy...!') => {
        if (ref.current.value === val) {
            ref.current.setCustomValidity(message)
            ref.current.reportValidity()
            return false
        }
        ref.current.setCustomValidity('')
        return true
    },

    equal: (ref, val, message) => {
        if (ref.current.value !== val) {
            ref.current.setCustomValidity(message)
            ref.current.reportValidity()
            return false
        }
        ref.current.setCustomValidity('')
        return true
    },

    notLess: (ref, val = 8, message = 'Podaj dłuższy opis...!') => {
        if (ref.current.value.length < val) {
            ref.current.setCustomValidity(message)
            ref.current.reportValidity()
            return false
        }
        ref.current.setCustomValidity('')
        return true
    },

    notFuture: (refDate, refTime, message = 'Zgłaszaj tylko zdarzenia z przeszłości!!!') => {
        refDate.current.setCustomValidity('')
        refTime.current.setCustomValidity('')

        if (new Date(refDate.current.value) > new Date(Date.now())) {
            refDate.current.setCustomValidity(message)
            refDate.current.reportValidity()
            return false
        }
        if (new Date(`${refDate.current.value} ${refTime.current.value}`) > new Date(Date.now())) {
            refTime.current.setCustomValidity(message)
            refTime.current.reportValidity()
            return false
        }
        return true
    },

    inputDigitsOnly: (e) => {
        let chrTyped
        let chrCode = 0
        if (e.charCode != null) chrCode = e.charCode
        else if (e.which != null) chrCode = e.which
        else if (e.keyCode != null) chrCode = e.keyCode

        if (chrCode === 0) chrTyped = 'SPECIAL KEY'
        else chrTyped = String.fromCharCode(chrCode)

        if (chrTyped.match(/\d|[\b]|SPECIAL/)) return true
        if (e.altKey || e.ctrlKey || chrCode < 28) return true

        if (e.preventDefault) e.preventDefault()
        e.returnValue = false
        return false
    },
}
