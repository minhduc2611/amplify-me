import type { DirectiveBinding, ObjectDirective } from "vue";

interface ClickUploadFileBinding extends DirectiveBinding {
  value: (files: File[]) => void;
  arg?: HTMLInputElement["accept"];
}

/**
 * v-click-upload-file
 * @param el
 * @param binding
 */
const clickUploadFile: ObjectDirective = {
  mounted(el: HTMLElement, binding: ClickUploadFileBinding) {
    el.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "file"; 
      input.multiple = true;
      binding.arg ? (input.accept = binding.arg) : (input.accept = "*/*");

      input.addEventListener("change", () => {
        if (input.files && input.files.length > 0) {
          const finalFiles = Array.from(input.files)
          console.log("finalFiles", finalFiles);
          binding.value(finalFiles);
        }
      });
      input.click();
    });
  },
  beforeUnmount(el: HTMLElement) {
    el.removeEventListener("click", () => {});
  },
};
export default clickUploadFile;
