import {ref, watch} from "vue";
import {getAccountLists} from '../../axios/getExpressLists.js';
import {ElMessageBox} from "element-plus";

export const setUp = () => {
    const createAccountBool = ref(false);
    const time = ref();
    const showPriKey = ref('请登录');
    const saveMnemonic = ref(true);
    const thisMnemonic = ref([]); //生成的助记词
    const password = ref(); //密码
    const publicKey = ref(); //公钥
    const privateKey = ref() //私钥
    const judgmentPassword = /^[A-Z][a-zA-Z0-9]{5,19}$/;
    const formatWarningsState = ref('none');

// 关闭右侧抽屉
    const cancelClick = () => {
        createAccountBool.value = false;
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

    const generateMnemonic = async () => {
        createAccountBool.value = true
        await getAccountLists().generateMnemonic()
            .then(() => {
                for (let i = 0; i < getAccountLists().thisMnemonic.length; i += 4) {
                    thisMnemonic.value.push(getAccountLists().thisMnemonic.slice(i, i + 4));
                }
            })
    }

    const putInPassword = async () => {
        saveMnemonic.value = false;
        if (judgmentPassword.test(password.value)) {
            await getAccountLists().getGenerateAccountLists(password.value)
                .then(() => {
                    publicKey.value = getAccountLists().thisAccountLists.getPublicKey;
                    privateKey.value = getAccountLists().thisAccountLists.getPrivateKey;
                })
        } else {
            await ElMessageBox.alert(
                '<h2 style="text-align: center">密码格式错误!</h2>',
                {
                    dangerouslyUseHTMLString: true,
                }
            )
        }
    }
    watch(password, () => {
        if (judgmentPassword.test(password.value)) {
            formatWarningsState.value = 'block';
        } else {
            formatWarningsState.value = 'none';
        }
    })



    return {
        createAccountBool,
        cancelClick,
        startTimer,
        cancelTimer,
        signOut,
        saveMnemonic,
        generateMnemonic,
        thisMnemonic,
        putInPassword,
        password,
        publicKey,
        privateKey,
        formatWarningsState,
    }
}