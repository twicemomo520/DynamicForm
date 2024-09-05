
import {defineStore} from "pinia"

export const useAlertStore = defineStore("alert",{
    state(){
        return{
          showAlert: false,
          alertType: "", // "success" 或 "error"
          alertMessage: ""
        }
    },
    actions: {
        showSuccess(message) {
          this.showAlert = true;
          this.alertType = "success";
          this.alertMessage = message;
        },
        showError(message) {
          this.showAlert = true;
          this.alertType = "error";
          this.alertMessage = message;
        },
        hideAlert() {
          this.showAlert = false;
          this.alertType = "";
          this.alertMessage = "";
        }
      }
})













