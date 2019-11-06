import MTPluginSquooshSquoosh from "./sdk.js";

($ => {
  async function init() {
    const { back, setFile, getBlob } = await MTPluginSquooshSquoosh(
      document.querySelector("#mt-plugin-squoosh-editor"),
      "https://usualoma.github.io/mt-plugin-Squoosh/squoosh-sdk/0.0.1/"
    );

    const uploadFiles = window.uploadFiles;
    window.uploadFiles = files => {
      let promise = Promise.resolve();
      for (let i = 0; i < files.length; i++) {
        const f = files[i];

        if (!f.type.match("image.*")) {
          uploadFiles([f]);
          continue;
        }

        promise = promise.then(() => {
          return new Promise(async resolve => {
            $("#mt-plugin-squoosh-modal").one(
              `shown.bs.modal.MTPluginSquoosh.${i}`,
              () => {
                if (
                  $("#mt-plugin-squoosh-modal").closest(".modal-body")
                    .length === 0
                ) {
                  return;
                }

                parent
                  .jQuery(parent.jQuery.find(".mt-dialog-iframe"))
                  .closest(".modal-dialog")
                  .css({ "max-width": "100%" });
              }
            );

            $("#mt-plugin-squoosh-modal").on(
              `hidden.bs.modal.MTPluginSquoosh.${i}`,
              () => {
                back();

                if (
                  $("#mt-plugin-squoosh-modal").closest(".modal-body")
                    .length !== 0
                ) {
                  parent
                    .jQuery(parent.jQuery.find(".mt-dialog-iframe"))
                    .closest(".modal-dialog")
                    .css({ "max-width": "" });
                }

                $("#mt-plugin-squoosh-upload").off(
                  `click.MTPluginSquoosh.${i}`
                );
                $("#mt-plugin-squoosh-modal").off(
                  `hidden.bs.modal.MTPluginSquoosh.${i}`
                );

                resolve();
              }
            );

            $("#mt-plugin-squoosh-modal").modal({
              backdrop: "static",
              keyboard: false,
            });

            $("#mt-plugin-squoosh-upload").on(
              `click.MTPluginSquoosh.${i}`,
              async () => {
                const blob = await getBlob(1);
                uploadFiles([new File([blob], f.name, { type: f.type })]);
                $("#mt-plugin-squoosh-modal").modal("hide");
              }
            );

            const blob = await fetch(URL.createObjectURL(f)).then(resp =>
              resp.blob()
            );
            setFile(blob, f.name);
          });
        });
      }
    };
  }
  init();
})(jQuery);
