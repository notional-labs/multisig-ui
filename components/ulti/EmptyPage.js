import Empty from "antd/lib/empty"
import Button from "../input/Button"

const EmptyPage = ({ description, addButton = false, button }) => {
    return (
        <div
            style={{
                position: 'relative',
                top: '10vh'
            }}
        >
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={description}
            >
                {
                    addButton && button
                }
            </Empty>
        </div>
    )
}

export default EmptyPage