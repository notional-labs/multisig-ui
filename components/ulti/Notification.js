import { notification, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

notification.config({
    placement: 'bottomRight'
});

export const openNotification = (type, message) => {
    notification[type]({
        message,
        duration: 3,
    });
};

export const openLoadingNotification = (cmd, message) => {
    if (cmd === 'open') {
        notification.open({
            key: 'updatable',
            message: (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        color: '#00FFA3',
                        margin: 0
                    }}
                >
                    <Spin 
                        style={{
                            color: '#00FFA3',
                        }}
                        indicator={antIcon} 
                    />
                    <p
                        style={{
                            marginLeft: '20px',
                            marginBottom: 0
                        }}
                    >
                        {message}
                    </p>
                </div>
            ),
            duration: 0,

        });
    }
    else {
        notification.destroy()
    }
}