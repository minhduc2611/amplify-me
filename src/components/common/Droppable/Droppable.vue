<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref } from 'vue';
interface DragEnterEvent extends DragEvent {
    dataTransfer: DataTransfer & {
        types: Array<string>,
        items: Array<DataTransferItem>,
    }
}
const props = defineProps({
    accept: {
        type: String,
        required: true,
        default: 'image/*',
    }
})

const emit = defineEmits(['files-dropped'])

// Create `active` state and manage it with functions
let active = ref(false)

const setActive = () => {
    active.value = true
}

const setInactive = () => {
    active.value = false
}

function onDrop(e: DragEvent) {

    const allowedTypes = props.accept.split(',').map(media => media.trim().replace('/*', ''));
    const files = e.dataTransfer?.files || [];

    const finalFiles = Array.from(files).filter(file => {
        
        const isAllowedType = allowedTypes.some(type => file.type.includes(type));
        return isAllowedType;
    })

    const isAllowedType = allowedTypes.some(type => e.dataTransfer?.types.includes(type));

    emit('files-dropped', finalFiles!)
}

function preventDefaults(e: Event) {
    setActive()
}


const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
    setInactive()
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults)
    })
})

onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults)
    })
})


</script>

<template>
    <main>
        <h1 className="text-3xl font-bold underline">
            <div :data-active="active" @dragenter.prevent="setActive" @dragover.prevent="setActive"
                @dragleave.prevent="setInactive" @drop.prevent="onDrop">
                <slot :dropZoneActive="active"></slot>
            </div>
        </h1>
    </main>
</template>
