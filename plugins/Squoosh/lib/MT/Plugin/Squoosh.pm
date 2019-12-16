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

sub squoosh_enabled {
    my $class = shift;
    my ($author) = @_;
    if (!$author || !defined($author->squoosh_enabled)) {
        plugin()->get_config_value('squoosh_enabled_by_default');
    }
    else {
        $author->squoosh_enabled;
    }
}

sub pre_save_author {
    my ($cb, $app, $obj, $original) = @_;
    if ($app->param('squoosh_enabled_beacon')) {
        $obj->squoosh_enabled($app->param('squoosh_enabled') ? 1 : 0);
        $original->squoosh_enabled($app->param('squoosh_enabled') ? 1 : 0);
    }
    1;
}

sub insert_after {
    my ($tmpl, $id, $tokens) = @_;

    my $before = $id ? $tmpl->getElementById($id) : undef;

    if (!ref $tokens) {
        $tokens = plugin()->load_tmpl($tokens)->tokens;
    }

    foreach my $t ( @$tokens ) {
        $tmpl->insertAfter( $t, $before );
        $before = $t;
    }
}

sub template_param_async_asset_upload {
    my ($cb, $app, $param, $tmpl) = @_;

    my $squoosh_enabled = __PACKAGE__->squoosh_enabled($app->user);
    my $squoosh_static_path = do {
        my $plugin = plugin();
	    my $static = $app->static_path;
	    my $plugin_name = basename($plugin->{full_path});
	    my $dir = basename(dirname($plugin->{full_path}));
        "$static$dir/$plugin_name";
    };

    insert_after($tmpl, 'normalize_orientation', 'async_asset_upload.tmpl');
    insert_after($tmpl, 'normalize_orientation', [
        $tmpl->createElement('var', {
            name => 'squoosh_enabled',
            value => $squoosh_enabled,
        }),
        $tmpl->createElement('var', {
            name => 'squoosh_static_path',
            value => $squoosh_static_path,
        }),
    ]);
    insert_after($tmpl, undef, 'async_asset_upload_modal.tmpl');
}

sub template_param_edit_author {
    my ($cb, $app, $param, $tmpl) = @_;

    my $author = $app->param('id') ? MT->model('author')->load($app->param('id')) : undef;
    $param->{squoosh_enabled} = __PACKAGE__->squoosh_enabled($author);

    insert_after($tmpl, 'tag_delim', 'edit_author.tmpl');
}

1;
