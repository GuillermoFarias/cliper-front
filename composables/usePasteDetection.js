import { ref } from 'vue';

export function usePasteDetection() {
    const isPasted = ref(false);

    const handlePaste = () => {
        isPasted.value = true;
        setTimeout(() => {
            isPasted.value = false;
        }, 2000); // Reset after 2 seconds
    };

    return { isPasted, handlePaste };
}