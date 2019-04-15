import { Message } from 'element-ui'

export const info = function(message) {
    Message({
        type: 'info',
        message,
        duration: 2000,
        showClose: true,
        onClose: Message.close()
    })
};

export const success = function(message) {
    Message({
        type: 'success',
        message,
        duration: 2000,
        showClose: true,
        onClose: Message.close()
    })
};

export const warning = function(message) {
    Message({
        type: 'warning',
        message,
        duration: 2000,
        showClose: true,
        onClose: Message.close()
    })
};

export const error = function(message) {
    Message({
        type: 'error',
        message,
        duration: 2000,
        showClose: true,
        onClose: Message.close()
    })
};
