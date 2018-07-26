var util = {
    spinnerVisible: false,
    showProgress: function() {
        console.info("BEGIN showProgress");
        if (!this.spinnerVisible) {
            $("div#spinner").fadeIn("fast");
            this.spinnerVisible = true;
        }
    },
    hideProgress: function() {
        if (this.spinnerVisible) {
            var spinner = $("div#spinner");
            spinner.stop();
            spinner.fadeOut("fast");
            this.spinnerVisible = false;
        }
    }
}