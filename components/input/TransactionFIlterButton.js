import Button from "./Button"
import FlexRow from "../flex_box/FlexRow"

const buttonList = [
    {
        text: 'All',
        value: 'all'
    },
    {
        text: 'Pending',
        value: 'pending'
    },
    {
        text: 'Finished',
        value: 'finished'
    }
]

const getButtonList = (currentFilter, setFilter) => {
    return buttonList.map((button, index) => {
        const leftMover = index * 20
        return (
            <Button
                text={button.text}
                index={index}
                style={{
                    position: 'relative',
                    zIndex: currentFilter === button.value ? 4 : index === 1 ? 3 : 2,
                    borderRadius: '30px 30px 0 0',
                    backgroundColor: currentFilter === button.value ? 'white' : '#d6d6d6',
                    border: 0,
                    padding: '.5em',
                    fontSize: '1.25rem',
                    width: '15%',
                    left: index !== 0 && `-${leftMover}px`,
                    boxShadow: '0px -8px 15px -3px rgba(0, 0, 0, 0.25)',
                }}
                clickFunction={() => setFilter(button.value)}
            />
        )
    })
}

const TransactionFilterButton = ({setFilter, currentFilter}) => {
    return (
        <div
            style={{
                position: 'relative',
            }}
        >
            <FlexRow
                components={getButtonList(currentFilter, setFilter)}
                justifyContent={'start'}
            />
        </div>
    )
}

export default TransactionFilterButton