import Button from '../../components/button/Button'

const Buttons = ({ clickPrev, clickNext }) => {
    return (
        <div className="report__buttons">
            <Button className="button button-rounded" onClick={clickPrev}>
                Wstecz
            </Button>
            <Button className="button button-rounded" onClick={clickNext}>
                Dalej
            </Button>
        </div>
    )
}

export default Buttons
