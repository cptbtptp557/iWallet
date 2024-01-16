import {ref} from "vue";

export const home = () => {
    const isCollapse = ref(false);
    return {
        isCollapse,
    }
}