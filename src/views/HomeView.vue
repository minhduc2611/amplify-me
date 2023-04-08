<script setup lang="ts">
import Droppable from '@/components/common/Droppable/Droppable.vue'
import FilePreview from '@/components/home-view/FilePreview/FilePreview.vue'

import { ref } from 'vue'


const filesRef = ref<File[]>([])

const handleFileUpload = (files: File[]) => {
  // handle the uploaded file here
  filesRef.value = files
  console.log('File uploaded ======> :', filesRef);
}

const FILE_ALLOWED = 'image/*'
</script>

<template>
  <main>
    <div>
      <Droppable :accept="FILE_ALLOWED" @files-dropped="handleFileUpload" #default="{ dropZoneActive }">
        <div v-click-upload-file="handleFileUpload, FILE_ALLOWED" className=""
          :class="{ 'border-dashed border-2 border-indigo-600': dropZoneActive }">
          Upload
        </div>
      </Droppable>
      <div  class="flex flex-row h-[300px]">
        <FilePreview :height="'100px'" v-for="file in filesRef" :key="file.name" :file="file" />
      </div>
    </div>
  </main>
</template>
