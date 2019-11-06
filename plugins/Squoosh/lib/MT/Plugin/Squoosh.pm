package MT::Plugin::Squoosh;

use strict;
use warnings;
use utf8;

use File::Basename qw(basename dirname);

sub component {
    __PACKAGE__ =~ m/::([^:]+)\z/;
}

sub plugin {
    MT->component(component());
}

sub template_source_async_asset_upload {
    my ($cb, $app, $tmpl) = @_;
    my $plugin = plugin();

	my $static = $app->static_path;
	my $plugin_name = basename($plugin->{full_path});
	my $dir = basename(dirname($plugin->{full_path}));

    $$tmpl .= <<__HTML__;
<__trans_section component="@{[component()]}">

<script type="module" src="$static$dir/$plugin_name/js/main.js"></script>

<style type="text/css">
#mt-plugin-squoosh-modal .modal-dialog {
  max-width: 100%;
}

#mt-plugin-squoosh-modal .modal-body {
  max-height: calc(100vh - 62px - 49px - 2rem - 2rem);
  height: calc(100vh - 62px - 49px - 2rem - 2rem);
}

#mt-plugin-squoosh-modal iframe {
  width: 100%;
  height: 100%;
}
</style>

<div id="mt-plugin-squoosh-modal" class="modal" role="dialog" aria-hidden="true" tabindex="-1">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title"><__trans phrase="Optimize Image"></h4>
      </div>
      <div class="modal-body">
        <iframe id="mt-plugin-squoosh-editor" style="flex: 1 1; border: 0"></iframe>
      </div>
      <div class="modal-footer">
        <button
           type="submit"
           id="mt-plugin-squoosh-upload"
           class="btn btn-primary action primary button">
          <__trans phrase="Upload">
        </button>
        <button
           type="button"
           class="btn btn-default action button"
           data-dismiss="modal">
          <__trans phrase="Cancel">
        </button>
      </div>
    </div>
  </div>
</div>

</__trans_section>
__HTML__
}

1;
