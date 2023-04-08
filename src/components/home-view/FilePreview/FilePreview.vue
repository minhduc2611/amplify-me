
<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue';

const props = defineProps({
    file: {
        type: File,
        required: true,
    },
    height: [String, Number] as PropType<string | number>
})
const filePreviewUrl = ref<string>('')

onMounted(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
        filePreviewUrl.value = e.target?.result as string || '';
    };
    reader.readAsDataURL(props.file);
})
const heightValue = typeof props.height === 'string' ? props.height : `${props.height}px`
</script>

<template>
    <div v-if="filePreviewUrl">
        <img class="rounded-sm" :style="{ height: heightValue }" :src="filePreviewUrl" />
    </div>
</template>
