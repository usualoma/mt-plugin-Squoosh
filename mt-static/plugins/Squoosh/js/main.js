import MTPluginSquooshSquoosh from "./sdk.js";

jQuery($ => {
  $("#mt-plugin-squoosh-filename").on("input.MTPluginSquoosh", ev => {
    const $span = $("<span />")
      .text(ev.target.value)
      .appendTo("body");
    $(ev.target).css({ width: `${$span.width() + 25}px` });
    $span.remove();
  });

  async function init() {
    const { back, setFile, getBlob } = await MTPluginSquooshSquoosh(
      document.querySelector("#mt-plugin-squoosh-editor"),
      "https://usualoma.github.io/mt-plugin-Squoosh/squoosh-sdk/0.0.1/"
    );

    const uploadFiles = window.uploadFiles;
    window.uploadFiles = (files, items) => {
      if (!document.querySelector("#squoosh_enabled").checked) {
        return uploadFiles(files);
      }

      let promise = Promise.resolve();
      for (let i = 0; i < files.length; i++) {
        if (files[i].size === 0) {
          // Maybe directory
          continue;
        }
        if (
          items &&
          items[i].webkitGetAsEntry &&
          items[i].webkitGetAsEntry().isDirectory
        ) {
          // Maybe directory only for Chrome
          continue;
        }

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

            $("#mt-plugin-squoosh-filename")
              .val(f.name)
              .triggerHandler("input.MTPluginSquoosh");
            $("#mt-plugin-squoosh-upload").prop("disabled", false);

            $("#mt-plugin-squoosh-modal").modal({
              backdrop: "static",
              keyboard: false,
            });

            $("#mt-plugin-squoosh-upload").on(
              `click.MTPluginSquoosh.${i}`,
              async ev => {
                $("#mt-plugin-squoosh-upload").prop("disabled", true);

                const blob = await getBlob(1);
                const name = $("#mt-plugin-squoosh-filename").val() || f.name;
                uploadFiles([new File([blob], name, { type: f.type })]);
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
});
