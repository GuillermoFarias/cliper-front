<script setup>
import { usePasteDetection } from '~/composables/usePasteDetection';
import { useCliper } from '~/composables/useCliper';
const longUrl = ref('');
const shortUrl = ref('');
const messageTtl = ref(5000);
const errorMessage = ref('');
const successMessage = ref('');
const displaySuccessMessage = ref(false);
const displayErrorMessage = ref(false);
const { isPasted, handlePaste } = usePasteDetection();

const handleInput = (event) => {
    console.log(event);
};

const showErrorMessage = (error) => {
    errorMessage.value = error;
    displayErrorMessage.value = true;
    setTimeout(() => {
        displayErrorMessage.value = false;
        errorMessage.value = '';
    }, messageTtl.value);
};

const showSuccessMessage = (message) => {
    successMessage.value = message;
    displaySuccessMessage.value = true;
    setTimeout(() => {
        displaySuccessMessage.value = false;
        successMessage.value = '';
    }, messageTtl.value);
};

const removeProtocol = (url) => {
    return url.replace(/(^\w+:|^)\/\//, '');
};

const makeShortUrl = async (url) => {
    const cliper = useCliper();
    console.log(url);
    if (!cliper.isValidUrl(url)) {
        showErrorMessage('Invalid url');
        return;
    }
    try {
        const response = await cliper.shortenUrl(url);
        console.log(removeProtocol(response.short_url));
        shortUrl.value = removeProtocol(response.short_url);
        showSuccessMessage('Your link has been shortened and is ready to be shared');
        longUrl.value = '';
    } catch (error) {
        showErrorMessage('An error has occurred');
    }
};

const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = shortUrl.value;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showSuccessMessage('Copied to clipboard');
};

</script>
<template>
    <div class="surface-overlay py-3 px-6 shadow-2 flex align-items-center justify-content-between relative lg:static">
        <i class="pi pi-paperclip" style="font-size: 2rem"></i>
        <a class="cursor-pointer block lg:hidden text-700"
            v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
            <i class="pi pi-bars text-4xl"></i>
        </a>
        <div
            class="align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full surface-overlay left-0 top-100 px-6 lg:px-0 z-2 shadow-2 lg:shadow-none">
            <section></section>
            <ul
                class="list-none p-0 m-0 flex lg:align-items-center text-900 select-none flex-column lg:flex-row cursor-pointer">
                <li>
                    <a
                        class="flex px-0 lg:px-5 py-3 hover:text-blue-600 font-medium transition-colors transition-duration-150 p-ripple">
                        <span>Statistics</span>
                    </a>
                </li>
                <li>
                    <a
                        class="flex px-0 lg:px-5 py-3 hover:text-blue-600 font-medium transition-colors transition-duration-150 p-ripple">
                        <span>Saved urls</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="relative p-6 overflow-hidden">
        <img src="/images/blocks/hero/hero-2.jpg" alt="Image"
            class="absolute top-0 left-0 w-auto h-full block md:w-full" />

        <div class="text-center my-6 relative">
            <div class="text-6xl text-white font-bold mb-1">
                <i class="pi pi-paperclip text-5xl text-white"></i>
                Cliper
            </div>
            <div class="text-6xl text-primary font-bold mb-4">Cut all, Share better</div>
            <p class="mt-0 mb-4 line-height-3 text-center mx-auto text-white" style="max-width:500px">A little demo of
                how to create a short link generator</p>

            <div class="flex justify-content-center flex-wrap">
                <InputGroup class="xs:w-10 md:w-6 lg:w-6">
                    <InputText placeholder="Paste here your link" v-model="longUrl" />
                    <Button icon="pi pi-link" severity="primary" @click="makeShortUrl(longUrl)" />
                    <InputText placeholder="take here your short url" v-model="shortUrl" />
                    <Button icon="pi pi-copy" severity="success" v-if="shortUrl" @click="copyToClipboard" />
                </InputGroup>
            </div>
            <div class="flex justify-content-center flex-wrap">
                <Message severity="success" icon="pi pi-check" v-if="displaySuccessMessage">
                    {{ successMessage }}
                </Message>
            </div>
            <div class="flex justify-content-center flex-wrap">
                <Message severity="error" icon="pi pi-times" text="An error has occurred" v-if="displayErrorMessage">
                    {{ errorMessage }}
                </Message>
            </div>
        </div>
    </div>
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
        <div class="mb-3 font-bold text-3xl">
            <span class="text-900">More than demo, </span>
            <span class="text-blue-600">a functional app</span>
        </div>
        <div class="text-700 mb-6">Made with python in backend, nuxt in front and K8's as infra.</div>
        <div class="grid">
            <div class="col-12 md:col-4 mb-4 px-5">
                <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                    <i class="pi pi-check-circle text-4xl text-blue-500"></i>
                </span>
                <div class="text-900 text-xl mb-3 font-medium">Testing and coverage</div>
                <span class="text-700 line-height-3">Unit testing and E2E.</span>
            </div>
            <div class="col-12 md:col-4 mb-4 px-5">
                <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                    <i class="pi pi-github text-4xl text-blue-500"></i>
                </span>
                <div class="text-900 text-xl mb-3 font-medium">Public code</div>
                <span class="text-700 line-height-3">Check core in github repo.</span>
            </div>
            <div class="col-12 md:col-4 mb-4 px-5">
                <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                    <i class="pi pi-globe text-4xl text-blue-500"></i>
                </span>
                <div class="text-900 text-xl mb-3 font-medium">CI/CD</div>
                <span class="text-700 line-height-3">In k8's cluster using Gihub actions.</span>
            </div>
        </div>
    </div>
    <div class="surface-section pt-2 pb-8">
        <div class="flex justify-content-center flex-wrap">
            <p class="text-sm mt-4 mb-2 line-height-3 text-white">Guillermo Farías</p>
        </div>
        <div class="flex justify-content-center align-items-center">
            <a href="https://github.com/GuillermoFarias" class="text-white">
                <i class="pi pi-github text-2xl"></i>
            </a>
        </div>
    </div>
</template>
<style>
.p-disabled,
.p-component:disabled {
    opacity: 0.8;
}
</style>