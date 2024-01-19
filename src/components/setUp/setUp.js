import {ref} from "vue";
import axios from 'axios';
import {ElMessageBox} from "element-plus";

export const setUp = () => {
    const createAccount = ref(false);
    const time = ref();
    const showPriKey = ref('请登录')

// 关闭右侧抽屉
    const cancelClick = () => {
        createAccount.value = false;
    }

// 开始计时器，延迟五秒执行打印操作
    const startTimer = () => {
        time.value = setTimeout(() => {
            ElMessageBox.alert(
                '<h2 style="text-align: center">' + showPriKey.value + '</h2>',
                '私钥',
                {
                    dangerouslyUseHTMLString: true,
                }
            )
        }, 1000);
    };

// 取消计时器
    const cancelTimer = () => {
        clearTimeout(time.value);
    };

// 将cookie里的publicKey清空---退出登录
    const signOut = () => {
        document.cookie = 'publicKey = ' + '';
        location.reload();
    }

    return {
        createAccount,
        cancelClick,
        startTimer,
        cancelTimer,
        signOut,
    }
}